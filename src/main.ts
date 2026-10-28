import express from "express";
import dotenv from "dotenv";
import { existsSync } from "node:fs";
import path from "node:path";
import { createApp } from "./app";
import { loadConfig } from "./config/environment";
import { ProcessIvrInput } from "./modules/ivr/application/use-cases/process-ivr-input";
import { StartIvrCall } from "./modules/ivr/application/use-cases/start-ivr-call";
import { ProcessUssdRequest } from "./modules/ussd/application/use-cases/process-ussd-request";

dotenv.config();

const config = loadConfig();
const welcomeAudioAvailable = existsSync(
  path.join(process.cwd(), "public", "audio", "welcome.wav"),
);
const app = createApp({
  processUssdRequest: new ProcessUssdRequest(),
  startIvrCall: new StartIvrCall(),
  processIvrInput: new ProcessIvrInput(),
  publicBaseUrl: config.publicBaseUrl,
  welcomeAudioAvailable,
});

app.use(
  "/audio",
  express.static(path.join(process.cwd(), "public", "audio"), {
    setHeaders(res, filePath) {
      if (filePath.toLowerCase().endsWith(".wav")) {
        res.setHeader("Content-Type", "audio/wav");
      }
    },
  }),
);

app.listen(config.port, () => {
  console.log(`USSD + IVR MVP listening at http://localhost:${config.port}`);
});
