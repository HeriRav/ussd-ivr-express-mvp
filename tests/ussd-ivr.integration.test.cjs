const assert = require("node:assert/strict");
const { after, before, describe, it } = require("node:test");
const { createApp } = require("../dist/app.js");
const { processUssdMenu } = require("../dist/modules/ussd/domain/services/ussd-menu.js");
const { loadConfig } = require("../dist/config/environment.js");
const { ProcessIvrInput } = require("../dist/modules/ivr/application/use-cases/process-ivr-input.js");
const { StartIvrCall } = require("../dist/modules/ivr/application/use-cases/start-ivr-call.js");
const { ProcessUssdRequest } = require("../dist/modules/ussd/application/use-cases/process-ussd-request.js");

const {
  regions,
  sectors,
  categories,
  subcategories
} = require("../dist/modules/shared/data/agricultural-data.js");
const {
  getCategoriesForSector,
  getSubcategoriesForCategory
} = require("../dist/modules/shared/domain/consultation-flow.js");

describe("USSD menu domain", () => {
  it("limits the regions and sectors to the requested agricultural menu", () => {
    assert.deepEqual(regions.map((region) => region.name.fr), ["Itasy", "Vakinankaratra"]);
    assert.deepEqual(sectors.map((sector) => sector.name.fr), ["Riz", "Maïs", "Café Arabica", "Lait", "Pomme de terre"]);
    assert.equal(sectors.length, 5);
    assert.equal(getCategoriesForSector("riz").length, 6);
    assert.equal(getCategoriesForSector("lait").length, 6);
  });

  it("shows category and subcategory options matching the selected crop", () => {
    const rizCategories = getCategoriesForSector("riz").map((category) => category.name.fr);
    assert.ok(rizCategories.includes("Irrigation et gestion de l'eau"));

    const irrigationSubcategories = getSubcategoriesForCategory("riz-irrigation-eau").map((subcategory) => subcategory.name.fr);
    assert.ok(irrigationSubcategories.includes("Lame d'eau peu profonde"));

    const laitSubcategories = getSubcategoriesForCategory("lait-eau-ferme").map((subcategory) => subcategory.name.fr);
    assert.ok(laitSubcategories.includes("Abreuvement des animaux"));
  });

  it("includes the full Coffee Arabica advisory catalog with stable identifiers", () => {
    const { coffeeAdviceEntries } = require("../dist/modules/shared/data/agricultural-data.js");
    assert.equal(coffeeAdviceEntries.length, 20);
    assert.deepEqual(
      coffeeAdviceEntries.map((entry) => entry.id),
      ["F01", "F02", "F03", "F04", "F05", "F06", "F07", "F08", "F09", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20"]
    );
    assert.equal(coffeeAdviceEntries[0].categoryId, "cafe-generalites");
    assert.equal(coffeeAdviceEntries[0].subcategoryId, "cafe-conditions");
    assert.equal(coffeeAdviceEntries[19].categoryId, "cafe-harvest-processing");
    assert.equal(coffeeAdviceEntries[19].subcategoryId, "cafe-wet-process");
    assert.match(coffeeAdviceEntries[0].ussdContent.fr, /Arabica/i);
    assert.match(coffeeAdviceEntries[19].ussdContent.mg, /Esory ny nofon'ny voa/i);
  });

  it("starts with a language choice and displays the irrigation advice in both languages", () => {
    assert.match(processUssdMenu("").message, /1\. Malagasy/);
    assert.match(processUssdMenu("2").message, /Itasy|Vakinankaratra/);

    const frenchAdvice = processUssdMenu("2*1*1*3*1");
    assert.equal(frenchAdvice.endSession, false);
    assert.match(frenchAdvice.message, /Maintenez une lame d'eau peu profonde/i);

    const malagasyAdvice = processUssdMenu("1*1*1*3*1");
    assert.match(malagasyAdvice.message, /Tano ny tanimbary|lame d'eau/i);
  });

  it("validates port and public HTTPS URL configuration", () => {
    assert.deepEqual(loadConfig({ PORT: "8080" }), { port: 8080 });
    assert.throws(() => loadConfig({ PORT: "0" }), /PORT must be an integer/);
    assert.throws(
      () => loadConfig({ PUBLIC_BASE_URL: "http://voice.example.test" }),
      /valid HTTPS URL/
    );
    assert.throws(
      () => loadConfig({ PUBLIC_BASE_URL: "https://voice.example.test?host=other" }),
      /query, or fragment/
    );
  });

  it("handles invalid choices and supports the end-of-session flow", () => {
    const invalidChoice = processUssdMenu("2*9");
    assert.equal(invalidChoice.endSession, false);
    assert.match(invalidChoice.message, /invalide|tsy misy|essayer/i);

    const complete = processUssdMenu("2*1*1*3*1*9");
    assert.equal(complete.endSession, true);
    assert.match(complete.message, /Merci|Misaotra/);
  });

  it("shows the post-conseil options in both languages and keeps the current advice state", () => {
    const frenchAdvice = processUssdMenu("2*1*1*3*1");
    assert.match(frenchAdvice.message, /1\. Répéter/);
    assert.match(frenchAdvice.message, /0\. Retour/);
    assert.match(frenchAdvice.message, /9\. Quitter/);

    const repeated = processUssdMenu("2*1*1*3*1*1");
    assert.equal(repeated.endSession, false);
    assert.match(repeated.message, /Maintenez une lame d'eau peu profonde/i);

    const back = processUssdMenu("2*1*1*3*1*0");
    assert.equal(back.endSession, false);
    assert.match(back.message, /sous-catégorie|zana-sokajy|Choisissez une sous-catégorie/i);

    const invalid = processUssdMenu("2*1*1*3*1*5");
    assert.equal(invalid.endSession, false);
    assert.match(invalid.message, /Choix invalide/);
    assert.match(invalid.message, /1\. Répéter/);

    const malagasyAdvice = processUssdMenu("1*1*1*3*1");
    assert.match(malagasyAdvice.message, /1\. Hamerina/);
    assert.match(malagasyAdvice.message, /0\. Hiverina/);
    assert.match(malagasyAdvice.message, /9\. Hivoaka/);
  });
});

describe("HTTP presentation", () => {
  let server;
  let baseUrl;

  before(async () => {
    const app = createApp({
      processUssdRequest: new ProcessUssdRequest(),
      startIvrCall: new StartIvrCall(),
      processIvrInput: new ProcessIvrInput(),
      publicBaseUrl: "https://voice.example.test",
      welcomeAudioAvailable: true
    });
    server = app.listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
  });

  after(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  });

  it("returns the expected USSD CON and END responses", async () => {
    const menu = await fetch(`${baseUrl}/ussd`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: "text=2"
    });
    assert.equal(menu.status, 200);
    assert.match(await menu.text(), /^CON Choisissez une région|^CON Safidy faritany/);

    const end = await fetch(`${baseUrl}/ussd`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: "text=2*1*1*3*1*9"
    });
    assert.match(await end.text(), /^END Merci|^END Misaotra/);
  });

  it("uses absolute webhook and audio URLs in valid TwiML", async () => {
    const voice = await fetch(`${baseUrl}/ivr/voice`, { method: "POST" });
    const xml = await voice.text();
    assert.equal(voice.headers.get("content-type").split(";")[0], "text/xml");
    assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?><Response>/);
    assert.match(xml, /<Play>https:\/\/voice\.example\.test\/audio\/welcome\.wav<\/Play>/);
    assert.match(xml, /action="https:\/\/voice\.example\.test\/ivr\/gather"/);

    const invalidChoice = await fetch(`${baseUrl}/ivr/gather`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: "Digits=9"
    });
    const invalidXml = await invalidChoice.text();
    assert.match(invalidXml, /<Redirect method="POST">https:\/\/voice\.example\.test\/ivr\/voice<\/Redirect>/);
  });

  it("rejects malformed provider fields and malformed JSON", async () => {
    const invalidField = await fetch(`${baseUrl}/ussd`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: 123 })
    });
    assert.equal(invalidField.status, 400);

    const malformedJson = await fetch(`${baseUrl}/ussd`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{"
    });
    assert.equal(malformedJson.status, 400);
  });

  it("acknowledges call-status callbacks without logging personal data", async () => {
    const status = await fetch(`${baseUrl}/ivr/status`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: "CallSid=CA123&CallStatus=completed&From=%2B261340000000"
    });
    assert.equal(status.status, 204);
  });

  it("exposes the predefined simulations API with filtering and 404 handling", async () => {
    const listResponse = await fetch(`${baseUrl}/api/simulations`);
    assert.equal(listResponse.status, 200);
    const listPayload = await listResponse.json();
    assert.equal(listPayload.success, true);
    assert.equal(listPayload.data.length, 20);
    assert.equal(listPayload.data[0].id, "F01");
    assert.equal(listPayload.data[19].id, "F20");

    const filteredResponse = await fetch(`${baseUrl}/api/simulations?channel=IVR&language=fr&region=Itasy&sector=coffee`);
    assert.equal(filteredResponse.status, 200);
    const filteredPayload = await filteredResponse.json();
    assert.ok(filteredPayload.data.length > 0);
    assert.ok(filteredPayload.data.every((entry) => entry.region.code === "ITASY"));
    assert.ok(filteredPayload.data.every((entry) => entry.sector.code === "CAFE_ARABICA"));

    const detailResponse = await fetch(`${baseUrl}/api/simulations/F08`);
    assert.equal(detailResponse.status, 200);
    const detailPayload = await detailResponse.json();
    assert.equal(detailPayload.data.id, "F08");
    assert.ok(detailPayload.data.advice.ussd.fr.length > 0);
    assert.ok(detailPayload.data.advice.ivr.mg.length > 0);

    const missingResponse = await fetch(`${baseUrl}/api/simulations/UNKNOWN`);
    assert.equal(missingResponse.status, 404);

    const invalidChannelResponse = await fetch(`${baseUrl}/api/simulations?channel=sms`);
    assert.equal(invalidChannelResponse.status, 400);

    const categoriesResponse = await fetch(`${baseUrl}/api/simulations/categories`);
    assert.equal(categoriesResponse.status, 200);
    const categoriesPayload = await categoriesResponse.json();
    assert.ok(categoriesPayload.data.length >= 5);
    assert.ok(categoriesPayload.data.some((entry) => entry.sector.code === "RIZ"));
    assert.ok(categoriesPayload.data[0].categories.length >= 1);
  });

  it("stores and retrieves simulation history entries", async () => {
    const createHistoryResponse = await fetch(`${baseUrl}/api/simulations/history`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        simulationId: "F08",
        channel: "IVR",
        language: "fr",
        region: "ITASY",
        sector: "CAFE_ARABICA",
        status: "completed"
      })
    });

    assert.equal(createHistoryResponse.status, 201);
    const createdPayload = await createHistoryResponse.json();
    assert.equal(createdPayload.success, true);
    assert.equal(createdPayload.data.simulationId, "F08");
    assert.equal(createdPayload.data.channel, "IVR");

    const historyResponse = await fetch(`${baseUrl}/api/simulations/history?channel=IVR&language=fr`);
    assert.equal(historyResponse.status, 200);
    const historyPayload = await historyResponse.json();
    assert.equal(historyPayload.success, true);
    assert.ok(historyPayload.data.some((entry) => entry.simulationId === "F08"));
  });

  it("creates and retrieves in-memory session records", async () => {
    const createSessionResponse = await fetch(`${baseUrl}/api/sessions`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sessionId: "call-001",
        channel: "IVR",
        language: "fr",
        region: "Itasy",
        sector: "CAFE_ARABICA",
        currentStep: "advice",
        status: "active"
      })
    });

    assert.equal(createSessionResponse.status, 201);
    const createdSession = await createSessionResponse.json();
    assert.equal(createdSession.success, true);
    assert.equal(createdSession.data.sessionId, "call-001");
    assert.equal(createdSession.data.channel, "IVR");

    const sessionListResponse = await fetch(`${baseUrl}/api/sessions?channel=IVR&language=fr`);
    assert.equal(sessionListResponse.status, 200);
    const sessionsPayload = await sessionListResponse.json();
    assert.equal(sessionsPayload.success, true);
    assert.ok(sessionsPayload.data.some((entry) => entry.sessionId === "call-001"));

    const sessionByIdResponse = await fetch(`${baseUrl}/api/sessions/call-001`);
    assert.equal(sessionByIdResponse.status, 200);
    const detailPayload = await sessionByIdResponse.json();
    assert.equal(detailPayload.data.sessionId, "call-001");
    assert.equal(detailPayload.data.currentStep, "advice");
  });
});
