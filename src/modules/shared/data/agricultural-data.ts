export type LanguageCode = "mg" | "fr";

export interface LocalizedText {
  mg: string;
  fr: string;
}

export interface Region {
  id: string;
  name: LocalizedText;
}

export interface Sector {
  id: string;
  name: LocalizedText;
  regions: string[];
}

export interface Category {
  id: string;
  name: LocalizedText;
  sectorId: string;
}

export interface Subcategory {
  id: string;
  name: LocalizedText;
  categoryId: string;
}

export interface AdviceEntry {
  id: string;
  regionId: string;
  sectorId: string;
  categoryId: string;
  subcategoryId: string;
  title?: LocalizedText;
  content?: LocalizedText;
  ussdContent?: LocalizedText;
  ivrContent?: LocalizedText;
}

export const regions: readonly Region[] = [
  { id: "itasy", name: { mg: "Itasy", fr: "Itasy" } },
  {
    id: "vakinankaratra",
    name: { mg: "Vakinankaratra", fr: "Vakinankaratra" },
  },
];

export const sectors: readonly Sector[] = [
  {
    id: "riz",
    name: { mg: "Riz", fr: "Riz" },
    regions: ["itasy", "vakinankaratra"],
  },
  {
    id: "mais",
    name: { mg: "Maïs", fr: "Maïs" },
    regions: ["itasy", "vakinankaratra"],
  },
  {
    id: "cafe-arabica",
    name: { mg: "Kafe Arabika", fr: "Café Arabica" },
    regions: ["itasy", "vakinankaratra"],
  },
  {
    id: "lait",
    name: { mg: "Lait", fr: "Lait" },
    regions: ["itasy", "vakinankaratra"],
  },
  {
    id: "pomme-de-terre",
    name: { mg: "Pomme de terre", fr: "Pomme de terre" },
    regions: ["itasy", "vakinankaratra"],
  },
];

export const categories: readonly Category[] = [
  {
    id: "riz-preparation-sol",
    sectorId: "riz",
    name: {
      mg: "Fanomanana ny tany",
      fr: "Préparation du sol ou aménagement de l'exploitation",
    },
  },
  {
    id: "riz-plantation-semis",
    sectorId: "riz",
    name: {
      mg: "Fambolena sy famafazana",
      fr: "Plantation, semis ou mise en place de la production",
    },
  },
  {
    id: "riz-irrigation-eau",
    sectorId: "riz",
    name: {
      mg: "Rano sy fitantanana ny rano",
      fr: "Irrigation et gestion de l'eau",
    },
  },
  {
    id: "riz-fertilisation",
    sectorId: "riz",
    name: {
      mg: "Fampitomboana",
      fr: "Fertilisation et alimentation des cultures",
    },
  },
  {
    id: "riz-entretien-sante",
    sectorId: "riz",
    name: {
      mg: "Fitandremana sy fiarovana",
      fr: "Entretien, santé et prévention des maladies",
    },
  },
  {
    id: "riz-recolte-production",
    sectorId: "riz",
    name: {
      mg: "Fangonam-bokatra sy fivarotana",
      fr: "Récolte, production, conservation ou commercialisation",
    },
  },

  {
    id: "mais-preparation-sol",
    sectorId: "mais",
    name: {
      mg: "Fanomanana ny tany",
      fr: "Préparation du sol ou aménagement de l'exploitation",
    },
  },
  {
    id: "mais-plantation-semis",
    sectorId: "mais",
    name: {
      mg: "Fambolena sy famafazana",
      fr: "Plantation, semis ou mise en place de la production",
    },
  },
  {
    id: "mais-irrigation-eau",
    sectorId: "mais",
    name: {
      mg: "Rano sy fitantanana ny rano",
      fr: "Irrigation et gestion de l'eau",
    },
  },
  {
    id: "mais-fertilisation",
    sectorId: "mais",
    name: {
      mg: "Fampitomboana",
      fr: "Fertilisation et alimentation des cultures",
    },
  },
  {
    id: "mais-entretien-sante",
    sectorId: "mais",
    name: {
      mg: "Fitandremana sy fiarovana",
      fr: "Entretien, santé et prévention des maladies",
    },
  },
  {
    id: "mais-recolte-production",
    sectorId: "mais",
    name: {
      mg: "Fangonam-bokatra sy fivarotana",
      fr: "Récolte, production, conservation ou commercialisation",
    },
  },

  {
    id: "cafe-generalites",
    sectorId: "cafe-arabica",
    name: { mg: "Fahafantarana ny kafe", fr: "Généralités" },
  },
  {
    id: "cafe-plant-production",
    sectorId: "cafe-arabica",
    name: { mg: "Famokarana zana-kafe", fr: "Production de plants" },
  },
  {
    id: "cafe-plantation",
    sectorId: "cafe-arabica",
    name: { mg: "Fambolena kafe", fr: "Plantation" },
  },
  {
    id: "cafe-maintenance",
    sectorId: "cafe-arabica",
    name: { mg: "Fikarakarana ny kafe", fr: "Entretien" },
  },
  {
    id: "cafe-pests-diseases",
    sectorId: "cafe-arabica",
    name: { mg: "Aretina sy bibikely", fr: "Maladies et ravageurs" },
  },
  {
    id: "cafe-harvest-processing",
    sectorId: "cafe-arabica",
    name: { mg: "Fiotazana sy fanodinana", fr: "Récolte et transformation" },
  },

  {
    id: "lait-alimentation",
    sectorId: "lait",
    name: { mg: "Fihinam-biby", fr: "Alimentation des animaux" },
  },
  {
    id: "lait-hygiene-traite",
    sectorId: "lait",
    name: {
      mg: "Fahadiovana amin'ny famosaviana",
      fr: "Hygiène de traite et nettoyage",
    },
  },
  {
    id: "lait-sante-animal",
    sectorId: "lait",
    name: {
      mg: "Fahasalamana amin'ny biby",
      fr: "Santé animale et prévention",
    },
  },
  {
    id: "lait-eau-ferme",
    sectorId: "lait",
    name: {
      mg: "Rano amin'ny toeram-piompiana",
      fr: "Eau et abreuvement à la ferme",
    },
  },
  {
    id: "lait-logement",
    sectorId: "lait",
    name: {
      mg: "Toeram-piompiana sy rivotra",
      fr: "Logement, ventilation et confort",
    },
  },
  {
    id: "lait-production-commercialisation",
    sectorId: "lait",
    name: {
      mg: "Famokarana sy fivarotana",
      fr: "Production, collecte et commercialisation",
    },
  },

  {
    id: "pdt-preparation-sol",
    sectorId: "pomme-de-terre",
    name: {
      mg: "Fanomanana ny tany",
      fr: "Préparation du sol ou aménagement de l'exploitation",
    },
  },
  {
    id: "pdt-plantation-semis",
    sectorId: "pomme-de-terre",
    name: {
      mg: "Fambolena sy famafazana",
      fr: "Plantation, semis ou mise en place de la production",
    },
  },
  {
    id: "pdt-irrigation-eau",
    sectorId: "pomme-de-terre",
    name: {
      mg: "Rano sy fitantanana ny rano",
      fr: "Irrigation et gestion de l'eau",
    },
  },
  {
    id: "pdt-fertilisation",
    sectorId: "pomme-de-terre",
    name: {
      mg: "Fampitomboana",
      fr: "Fertilisation et alimentation des cultures",
    },
  },
  {
    id: "pdt-entretien-sante",
    sectorId: "pomme-de-terre",
    name: {
      mg: "Fitandremana sy fiarovana",
      fr: "Entretien, santé et prévention des maladies",
    },
  },
  {
    id: "pdt-recolte-production",
    sectorId: "pomme-de-terre",
    name: {
      mg: "Fangonam-bokatra sy fivarotana",
      fr: "Récolte, production, conservation ou commercialisation",
    },
  },
];

export const subcategories: readonly Subcategory[] = [
  {
    id: "riz-labour",
    categoryId: "riz-preparation-sol",
    name: { mg: "Fandoroana sy fanalefahana", fr: "Labour et nivellement" },
  },
  {
    id: "riz-drainage",
    categoryId: "riz-preparation-sol",
    name: { mg: "Fanariana rano", fr: "Drainage" },
  },
  {
    id: "riz-amendement",
    categoryId: "riz-preparation-sol",
    name: { mg: "Fanampin'ny tany", fr: "Amendement" },
  },
  {
    id: "riz-semis",
    categoryId: "riz-plantation-semis",
    name: { mg: "Fampinonoana", fr: "Semis" },
  },
  {
    id: "riz-repiquage",
    categoryId: "riz-plantation-semis",
    name: { mg: "Fandefasana", fr: "Repiquage" },
  },
  {
    id: "riz-lame-eau",
    categoryId: "riz-irrigation-eau",
    name: { mg: "Lame rano tsy matevina", fr: "Lame d'eau peu profonde" },
  },
  {
    id: "riz-canaux",
    categoryId: "riz-irrigation-eau",
    name: { mg: "Lakandrano", fr: "Canaux et évacuation" },
  },
  {
    id: "riz-engrais-fond",
    categoryId: "riz-fertilisation",
    name: { mg: "Fampitomboana fototra", fr: "Engrais de fond" },
  },
  {
    id: "riz-fumure",
    categoryId: "riz-fertilisation",
    name: { mg: "Fampiasana fanao otrikaina", fr: "Fumure azotée" },
  },
  {
    id: "riz-desherbage",
    categoryId: "riz-entretien-sante",
    name: { mg: "Fongotra", fr: "Désherbage" },
  },
  {
    id: "riz-ravageurs",
    categoryId: "riz-entretien-sante",
    name: { mg: "Biby manimba", fr: "Ravageurs" },
  },
  {
    id: "riz-recolte",
    categoryId: "riz-recolte-production",
    name: { mg: "Fangonam-bokatra", fr: "Récolte" },
  },
  {
    id: "riz-stockage",
    categoryId: "riz-recolte-production",
    name: { mg: "Fitahirizana", fr: "Stockage" },
  },

  {
    id: "mais-labour",
    categoryId: "mais-preparation-sol",
    name: { mg: "Fandoroana", fr: "Labour" },
  },
  {
    id: "mais-garantie-sol",
    categoryId: "mais-preparation-sol",
    name: { mg: "Fanamarinana ny tany", fr: "Amélioration du sol" },
  },
  {
    id: "mais-semis",
    categoryId: "mais-plantation-semis",
    name: { mg: "Fampinonoana", fr: "Semis" },
  },
  {
    id: "mais-espacement",
    categoryId: "mais-plantation-semis",
    name: { mg: "Elanelana", fr: "Espacement" },
  },
  {
    id: "mais-eau",
    categoryId: "mais-irrigation-eau",
    name: { mg: "Rano amin'ny voly", fr: "Eau du maïs" },
  },
  {
    id: "mais-arrosage",
    categoryId: "mais-irrigation-eau",
    name: { mg: "Fanondrahana rano", fr: "Irrigation et drainage" },
  },
  {
    id: "mais-engrais",
    categoryId: "mais-fertilisation",
    name: { mg: "Fampitomboana", fr: "Engrais" },
  },
  {
    id: "mais-fumure",
    categoryId: "mais-fertilisation",
    name: { mg: "Fumure", fr: "Fumure" },
  },
  {
    id: "mais-desherbage",
    categoryId: "mais-entretien-sante",
    name: { mg: "Fongotra", fr: "Désherbage" },
  },
  {
    id: "mais-ravageurs",
    categoryId: "mais-entretien-sante",
    name: { mg: "Bibikely manimba", fr: "Ravageurs" },
  },
  {
    id: "mais-recolte",
    categoryId: "mais-recolte-production",
    name: { mg: "Fangonam-bokatra", fr: "Récolte" },
  },
  {
    id: "mais-conservation",
    categoryId: "mais-recolte-production",
    name: { mg: "Fitahirizana", fr: "Conservation" },
  },

  {
    id: "cafe-conditions",
    categoryId: "cafe-generalites",
    name: { mg: "Toerana mety", fr: "Conditions de culture" },
  },
  {
    id: "cafe-varieties",
    categoryId: "cafe-generalites",
    name: { mg: "Karazana", fr: "Variétés" },
  },
  {
    id: "cafe-seeds",
    categoryId: "cafe-plant-production",
    name: { mg: "Masomboly", fr: "Semences" },
  },
  {
    id: "cafe-germination",
    categoryId: "cafe-plant-production",
    name: { mg: "Germoir", fr: "Germoir" },
  },
  {
    id: "cafe-nursery",
    categoryId: "cafe-plant-production",
    name: { mg: "Zana-kafe", fr: "Pépinière" },
  },
  {
    id: "cafe-preparation",
    categoryId: "cafe-plantation",
    name: { mg: "Fanomanana tany", fr: "Préparation" },
  },
  {
    id: "cafe-planting",
    categoryId: "cafe-plantation",
    name: { mg: "Fambolena", fr: "Plantation" },
  },
  {
    id: "cafe-irrigation",
    categoryId: "cafe-maintenance",
    name: { mg: "Fanondrahana", fr: "Irrigation" },
  },
  {
    id: "cafe-soil",
    categoryId: "cafe-maintenance",
    name: { mg: "Fiavana sy zezika", fr: "Entretien du sol" },
  },
  {
    id: "cafe-pruning",
    categoryId: "cafe-maintenance",
    name: { mg: "Fanetezana", fr: "Taille" },
  },
  {
    id: "cafe-rust",
    categoryId: "cafe-pests-diseases",
    name: { mg: "Harafesina", fr: "Rouille" },
  },
  {
    id: "cafe-anthracnose",
    categoryId: "cafe-pests-diseases",
    name: { mg: "Anthracnose", fr: "Anthracnose" },
  },
  {
    id: "cafe-drying",
    categoryId: "cafe-pests-diseases",
    name: { mg: "Rantsana maina", fr: "Dessèchement" },
  },
  {
    id: "cafe-bugs",
    categoryId: "cafe-pests-diseases",
    name: { mg: "Punaise", fr: "Punaise" },
  },
  {
    id: "cafe-scale",
    categoryId: "cafe-pests-diseases",
    name: { mg: "Cochenilles", fr: "Cochenilles" },
  },
  {
    id: "cafe-sooty",
    categoryId: "cafe-pests-diseases",
    name: { mg: "Fumagine", fr: "Fumagine" },
  },
  {
    id: "cafe-picking",
    categoryId: "cafe-harvest-processing",
    name: { mg: "Fiotazana", fr: "Récolte" },
  },
  {
    id: "cafe-drying-area",
    categoryId: "cafe-harvest-processing",
    name: { mg: "Fanamainana", fr: "Séchoir" },
  },
  {
    id: "cafe-dry-process",
    categoryId: "cafe-harvest-processing",
    name: { mg: "Fomba maina", fr: "Voie sèche" },
  },
  {
    id: "cafe-wet-process",
    categoryId: "cafe-harvest-processing",
    name: { mg: "Fomba mando", fr: "Voie humide" },
  },

  {
    id: "lait-alimentation-bovins",
    categoryId: "lait-alimentation",
    name: { mg: "Sakafo ho an'ny omby", fr: "Alimentation des bovins" },
  },
  {
    id: "lait-quantite-eau",
    categoryId: "lait-alimentation",
    name: { mg: "Rano ho an'ny omby", fr: "Eau et hydratation" },
  },
  {
    id: "lait-nettoyage-traite",
    categoryId: "lait-hygiene-traite",
    name: { mg: "Fadio ny fitehirizana", fr: "Nettoyage de la traite" },
  },
  {
    id: "lait-hygiene",
    categoryId: "lait-hygiene-traite",
    name: { mg: "Fahadiovana", fr: "Hygiène du matériel" },
  },
  {
    id: "lait-vaccination",
    categoryId: "lait-sante-animal",
    name: { mg: "Fanabeazana sy vaksiny", fr: "Vaccination et surveillance" },
  },
  {
    id: "lait-maladies",
    categoryId: "lait-sante-animal",
    name: { mg: "Aretina amin'ny omby", fr: "Maladies et signes" },
  },
  {
    id: "lait-abreuvement",
    categoryId: "lait-eau-ferme",
    name: { mg: "Fampiasana rano", fr: "Abreuvement des animaux" },
  },
  {
    id: "lait-canalisation",
    categoryId: "lait-eau-ferme",
    name: { mg: "Fitaovana ranon-trano", fr: "Système d'eau" },
  },
  {
    id: "lait-logement-animal",
    categoryId: "lait-logement",
    name: { mg: "Fanatierana ny trano", fr: "Logement et ventilation" },
  },
  {
    id: "lait-confort",
    categoryId: "lait-logement",
    name: { mg: "Fahafahana sy fanamaivanana", fr: "Confort animal" },
  },
  {
    id: "lait-collecte",
    categoryId: "lait-production-commercialisation",
    name: { mg: "Fanangonana ronono", fr: "Collecte du lait" },
  },
  {
    id: "lait-commercialisation",
    categoryId: "lait-production-commercialisation",
    name: { mg: "Fivarotana", fr: "Commercialisation" },
  },

  {
    id: "pdt-amendement",
    categoryId: "pdt-preparation-sol",
    name: { mg: "Fanomanana ny tany", fr: "Amendement du sol" },
  },
  {
    id: "pdt-niveau",
    categoryId: "pdt-preparation-sol",
    name: { mg: "Fanalefahana", fr: "Nivellement" },
  },
  {
    id: "pdt-planter",
    categoryId: "pdt-plantation-semis",
    name: { mg: "Fambolena", fr: "Plantation" },
  },
  {
    id: "pdt-planting-distance",
    categoryId: "pdt-plantation-semis",
    name: { mg: "Elanelana fambolena", fr: "Distance de plantation" },
  },
  {
    id: "pdt-fertilisation-eau",
    categoryId: "pdt-irrigation-eau",
    name: { mg: "Rano sy fepetra fanondrahana", fr: "Irrigation et humidité" },
  },
  {
    id: "pdt-evacuation",
    categoryId: "pdt-irrigation-eau",
    name: { mg: "Fandefasana rano", fr: "Évacuation de l'eau" },
  },
  {
    id: "pdt-engrais",
    categoryId: "pdt-fertilisation",
    name: { mg: "Fampitomboana", fr: "Engrais" },
  },
  {
    id: "pdt-fumure",
    categoryId: "pdt-fertilisation",
    name: { mg: "Fumure", fr: "Fumure" },
  },
  {
    id: "pdt-desherbage",
    categoryId: "pdt-entretien-sante",
    name: { mg: "Fongotra", fr: "Désherbage" },
  },
  {
    id: "pdt-ravageurs",
    categoryId: "pdt-entretien-sante",
    name: { mg: "Bibikely manimba", fr: "Ravageurs" },
  },
  {
    id: "pdt-recolte",
    categoryId: "pdt-recolte-production",
    name: { mg: "Fangonam-bokatra", fr: "Récolte" },
  },
  {
    id: "pdt-conservation",
    categoryId: "pdt-recolte-production",
    name: { mg: "Fitahirizana", fr: "Conservation" },
  },
];

export const coffeeAdviceEntries: readonly AdviceEntry[] = [
  {
    id: "F01",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-generalites",
    subcategoryId: "cafe-conditions",
    title: { mg: "Toerana mety", fr: "Conditions de culture" },
    ussdContent: {
      mg: "Mila toerana avo, tany lonaka ary rano ampy ny Arabica. Aza ambolena amin'ny tany mitana rano.",
      fr: "L'Arabica préfère l'altitude, un sol fertile et bien drainé. Évitez les sols où l'eau stagne.",
    },
    ivrContent: {
      mg: "Ny kafe Arabica dia maniry tsara amin'ny toerana avo sy somary mangatsiaka. Mila tany lonaka sy rano ampy izy. Tsy tokony hijanona eo amin'ny fakany ny rano. Diniho ny tany sy ny toetrandro alohan'ny hambolena.",
      fr: "Le café Arabica pousse bien en altitude et dans un climat frais. Il préfère un sol fertile et bien drainé. Avant de planter, vérifiez les conditions du terrain et la disponibilité de l'eau.",
    },
    content: {
      mg: "Mila toerana avo, tany lonaka ary rano ampy ny Arabica. Aza ambolena amin'ny tany mitana rano.",
      fr: "L'Arabica préfère l'altitude, un sol fertile et bien drainé. Évitez les sols où l'eau stagne.",
    },
  },
  {
    id: "F02",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-generalites",
    subcategoryId: "cafe-varieties",
    title: { mg: "Karazana", fr: "Variétés" },
    ussdContent: {
      mg: "Misy Arabica toy ny Bourbon, Laurina ary Ratelo. Fidio ny zana-kafe salama sy mety amin'ny faritra.",
      fr: "Parmi les Arabicas : Bourbon, Laurina et Ratelo. Choisissez des plants sains adaptés à votre région.",
    },
    ivrContent: {
      mg: "Misy karazana Arabica toy ny Bourbon, Laurina ary Ratelo. Tsy mitovy ny toetrany. Misafidiana zana-kafe salama avy amin'ny toerana azo antoka. Anontanio ny teknisianina ny karazana mety amin'ny faritra misy anao.",
      fr: "Il existe plusieurs variétés d'Arabica, notamment Bourbon, Laurina et Ratelo. Choisissez des plants sains provenant d'une source fiable. Demandez à un technicien quelle variété convient à votre région.",
    },
    content: {
      mg: "Misy Arabica toy ny Bourbon, Laurina ary Ratelo. Fidio ny zana-kafe salama sy mety amin'ny faritra.",
      fr: "Parmi les Arabicas : Bourbon, Laurina et Ratelo. Choisissez des plants sains adaptés à votre région.",
    },
  },
  {
    id: "F03",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-plant-production",
    subcategoryId: "cafe-seeds",
    title: { mg: "Masomboly", fr: "Semences" },
    ussdContent: {
      mg: "Mifidiana voa masaka avy amin'ny hazo salama. Esory ny voa simba. Aza atao maina tafahoatra ny masomboly.",
      fr: "Choisissez des cerises mûres sur des caféiers sains. Écartez les graines abîmées et évitez le séchage excessif.",
    },
    ivrContent: {
      mg: "Mifidiana voankafe masaka avy amin'ny hazo salama sy mamokatra tsara. Esory ny voa simba ary diovy ny masomboly. Aza atao maina tafahoatra ny voa alohan'ny famafazana, satria mety hampihena ny fitsimohany izany.",
      fr: "Choisissez des cerises mûres sur des caféiers sains et productifs. Écartez les fruits abîmés et préparez soigneusement les semences. Évitez de trop sécher les graines avant le semis, car cela peut réduire leur germination.",
    },
    content: {
      mg: "Mifidiana voa masaka avy amin'ny hazo salama. Esory ny voa simba. Aza atao maina tafahoatra ny masomboly.",
      fr: "Choisissez des cerises mûres sur des caféiers sains. Écartez les graines abîmées et évitez le séchage excessif.",
    },
  },
  {
    id: "F04",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-plant-production",
    subcategoryId: "cafe-germination",
    title: { mg: "Germoir", fr: "Semis" },
    ussdContent: {
      mg: "Ataovy amin'ny alokaloka ny germoir. Tazomy ho mando ny tany fa aza tondrahana be loatra.",
      fr: "Installez le germoir à l'ombre. Gardez le substrat humide, sans excès d'eau.",
    },
    ivrContent: {
      mg: "Omano amin'ny toerana misy alokaloka ny germoir. Mampiasà tany tsara sy zezika organika efa masaka. Afafazo ny masomboly ary sarony tany manify. Tazomy ho mando ny tany, fa aza tondrahana be loatra.",
      fr: "Préparez le germoir dans un endroit ombragé. Utilisez un bon substrat avec de la matière organique décomposée. Semez les graines et recouvrez-les légèrement. Maintenez l'humidité sans excès d'eau.",
    },
    content: {
      mg: "Ataovy amin'ny alokaloka ny germoir. Tazomy ho mando ny tany fa aza tondrahana be loatra.",
      fr: "Installez le germoir à l'ombre. Gardez le substrat humide, sans excès d'eau.",
    },
  },
  {
    id: "F05",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-plant-production",
    subcategoryId: "cafe-nursery",
    title: { mg: "Zana-kafe", fr: "Pépinière" },
    ussdContent: {
      mg: "Afindrao anaty kitapo ny zana-kafe efa misy ravina voalohany. Aza aforitra ny fakany.",
      fr: "Repiquez les jeunes plants dès les premières feuilles. Évitez de plier leurs racines.",
    },
    ivrContent: {
      mg: "Rehefa miseho ny ravina voalohany dia azo afindra anaty kitapo ny zana-kafe. Ataovy mahitsy ny fakany ary aza simba rehefa mamindra. Tondrahana araka izay ilaina ary arovy amin'ny masoandro mahery.",
      fr: "Lorsque les premières feuilles apparaissent, repiquez les jeunes caféiers en sachets. Placez délicatement les racines sans les plier. Arrosez selon les besoins et protégez les plants d'un soleil trop intense.",
    },
    content: {
      mg: "Afindrao anaty kitapo ny zana-kafe efa misy ravina voalohany. Aza aforitra ny fakany.",
      fr: "Repiquez les jeunes plants dès les premières feuilles. Évitez de plier leurs racines.",
    },
  },
  {
    id: "F06",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-plantation",
    subcategoryId: "cafe-preparation",
    title: { mg: "Fanomanana tany", fr: "Préparation" },
    ussdContent: {
      mg: "Diovy ny tany. Omano ny lavaka ary asio zezika organika masaka alohan'ny fambolena.",
      fr: "Nettoyez le terrain. Préparez les trous avec du fumier bien décomposé avant la plantation.",
    },
    ivrContent: {
      mg: "Diovy mialoha ny tany hambolena kafe. Mariho ny toerana hametrahana ny zana-kafe ary mihadia lavaka. Afangaro amin'ny zezika organika efa masaka ny tany ambony. Ataovy vonona ny toerana alohan'ny fotoam-pambolena.",
      fr: "Nettoyez le terrain avant la plantation. Marquez les emplacements des caféiers et préparez les trous. Mélangez la terre de surface avec du fumier bien décomposé. Terminez les préparatifs avant la plantation.",
    },
    content: {
      mg: "Diovy ny tany. Omano ny lavaka ary asio zezika organika masaka alohan'ny fambolena.",
      fr: "Nettoyez le terrain. Préparez les trous avec du fumier bien décomposé avant la plantation.",
    },
  },
  {
    id: "F07",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-plantation",
    subcategoryId: "cafe-planting",
    title: { mg: "Fambolena", fr: "Plantation" },
    ussdContent: {
      mg: "Mambole amin'ny fiandohan'ny orana. Esory moramora ny kitapo mba tsy hanimba ny faka.",
      fr: "Plantez au début des pluies. Retirez doucement le sachet sans abîmer les racines.",
    },
    ivrContent: {
      mg: "Amin'ny fiandohan'ny fotoam-pahavaratra no tsara hambolena zana-kafe. Misafidiana zana-kafe salama. Esory moramora ny kitapo mba tsy hanimba ny fakany. Apetraho ao anaty lavaka, sarony tany ary arovy amin'ny masoandro mahery.",
      fr: "Plantez les jeunes caféiers au début de la saison des pluies. Choisissez des plants vigoureux. Retirez doucement les sachets sans abîmer les racines. Placez les plants dans les trous et protégez-les si nécessaire du soleil.",
    },
    content: {
      mg: "Mambole amin'ny fiandohan'ny orana. Esory moramora ny kitapo mba tsy hanimba ny faka.",
      fr: "Plantez au début des pluies. Retirez doucement le sachet sans abîmer les racines.",
    },
  },
  {
    id: "F08",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-maintenance",
    subcategoryId: "cafe-irrigation",
    title: { mg: "Fanondrahana", fr: "Irrigation" },
    ussdContent: {
      mg: "Jereo ny hamandoan'ny tany. Tondrahana raha maina, fa aza avela hijanona eo am-potony ny rano.",
      fr: "Vérifiez l'humidité du sol. Arrosez si nécessaire, sans laisser l'eau stagner.",
    },
    ivrContent: {
      mg: "Mandritra ny main-tany dia jereo ny hamandoan'ny tany manodidina ny kafe. Raha maina loatra ny tany dia tondrahana araka izay ilaina. Aza avela hijanona eo am-potony ny rano. Rakofy akora organika ny tany mba hitazonana ny hamandoana.",
      fr: "Pendant la saison sèche, vérifiez régulièrement l'humidité du sol autour des caféiers. Arrosez si nécessaire, sans provoquer de stagnation d'eau. Le paillage aide à conserver l'humidité et à limiter les pertes d'eau.",
    },
    content: {
      mg: "Jereo ny hamandoan'ny tany. Tondrahana raha maina, fa aza avela hijanona eo am-potony ny rano.",
      fr: "Vérifiez l'humidité du sol. Arrosez si nécessaire, sans laisser l'eau stagner.",
    },
  },
  {
    id: "F09",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-maintenance",
    subcategoryId: "cafe-soil",
    title: { mg: "Fiavana sy zezika", fr: "Entretien du sol" },
    ussdContent: {
      mg: "Esory ny ahitra. Omeo zezika organika masaka ny tany ary rakofy bozaka maina.",
      fr: "Désherbez, apportez du fumier mûr et paillez le sol pour conserver l'humidité.",
    },
    ivrContent: {
      mg: "Esory tsy tapaka ny ahitra manodidina ny kafe mba tsy hifaninana amin'ny rano sy sakafo. Omeo zezika organika efa masaka ny tany. Aza apetaka amin'ny tahon'ny hazo ny zezika. Rakofy akora maina ny tany.",
      fr: "Désherbez régulièrement autour des caféiers pour réduire la concurrence pour l'eau et les nutriments. Apportez du fumier bien décomposé sans le placer contre le tronc. Paillez le sol pour conserver l'humidité.",
    },
    content: {
      mg: "Esory ny ahitra. Omeo zezika organika masaka ny tany ary rakofy bozaka maina.",
      fr: "Désherbez, apportez du fumier mûr et paillez le sol pour conserver l'humidité.",
    },
  },
  {
    id: "F10",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-maintenance",
    subcategoryId: "cafe-pruning",
    title: { mg: "Fanetezana", fr: "Taille" },
    ussdContent: {
      mg: "Esory ny rantsana maty. Diovy ny fitaovana. Mangataha torohevitra alohan'ny fanavaozana lehibe.",
      fr: "Retirez les branches mortes avec des outils propres. Demandez conseil avant une taille importante.",
    },
    ivrContent: {
      mg: "Ny fanetezana dia manampy amin'ny fikojakojana ny hazo kafe. Esory ny rantsana maty sy ireo solofony tsy ilaina. Ataovy madio ny fitaovana. Raha mila havaozina ny hazo antitra dia mangataha torohevitra amin'ny teknisianina.",
      fr: "La taille permet d'entretenir les caféiers et de faciliter la récolte. Retirez les branches mortes et les pousses inutiles avec des outils propres. Pour rajeunir un vieux caféier, demandez conseil à un technicien.",
    },
    content: {
      mg: "Esory ny rantsana maty. Diovy ny fitaovana. Mangataha torohevitra alohan'ny fanavaozana lehibe.",
      fr: "Retirez les branches mortes avec des outils propres. Demandez conseil avant une taille importante.",
    },
  },
  {
    id: "F11",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-pests-diseases",
    subcategoryId: "cafe-rust",
    title: { mg: "Harafesina", fr: "Rouille" },
    ussdContent: {
      mg: "Vovoka volomboasary ambanin'ny ravina? Mety ho harafesina. Manatona teknisianina.",
      fr: "Une poudre orangée sous les feuilles peut indiquer la rouille. Consultez un technicien.",
    },
    ivrContent: {
      mg: "Raha misy vovoka mavo na volomboasary ao ambanin'ny ravin-kafe dia mety ho harafesina izany. Mety hihintsana ny ravina rehefa mafy ny aretina. Araho maso ny hazo ary mangataha torohevitra alohan'ny hampiasana fanafody.",
      fr: "Une poudre jaune orangé sous les feuilles peut indiquer la rouille du caféier. Cette maladie peut provoquer la chute des feuilles. Surveillez les plants et demandez un diagnostic avant d'utiliser un traitement.",
    },
    content: {
      mg: "Vovoka volomboasary ambanin'ny ravina? Mety ho harafesina. Manatona teknisianina.",
      fr: "Une poudre orangée sous les feuilles peut indiquer la rouille. Consultez un technicien.",
    },
  },
  {
    id: "F12",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-pests-diseases",
    subcategoryId: "cafe-anthracnose",
    title: { mg: "Anthracnose", fr: "Anthracnose" },
    ussdContent: {
      mg: "Tasy mainty amin'ny voankafe? Mety misy aretina. Mangataha fanamarinana amin'ny teknisianina.",
      fr: "Des taches noires sur les cerises peuvent signaler une maladie. Faites confirmer le diagnostic.",
    },
    ivrContent: {
      mg: "Ny anthracnose dia mety hiteraka tasy mainty amin'ny voankafe sy fihintsanan'ny voa mbola maitso. Jereo matetika ny voankafe. Esory araka ny torohevitra ireo voa simba ary manatona teknisianina hanamarina ny aretina.",
      fr: "L'anthracnose peut provoquer des taches noires sur les cerises et la chute prématurée de fruits verts. Surveillez les caféiers. Faites confirmer le diagnostic et retirez les fruits atteints selon les conseils techniques.",
    },
    content: {
      mg: "Tasy mainty amin'ny voankafe? Mety misy aretina. Mangataha fanamarinana amin'ny teknisianina.",
      fr: "Des taches noires sur les cerises peuvent signaler une maladie. Faites confirmer le diagnostic.",
    },
  },
  {
    id: "F13",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-pests-diseases",
    subcategoryId: "cafe-drying",
    title: { mg: "Rantsana maina", fr: "Dessèchement" },
    ussdContent: {
      mg: "Rantsana maina? Esory ny rantsana maty. Manatona teknisianina raha miparitaka ny olana.",
      fr: "Rameaux secs ? Retirez le bois mort. Consultez un technicien si le problème progresse.",
    },
    ivrContent: {
      mg: "Raha maina manomboka eny amin'ny tendrony ny rantsan-kafe dia mety misy olana amin'ny fahasalaman'ny hazo. Esory amin'ny fitaovana madio ny rantsana maty. Hatsarao ny fikarakarana. Raha miparitaka ny fahamainana dia manatona teknisianina.",
      fr: "Le dessèchement des rameaux peut commencer à leur extrémité. Retirez les branches mortes avec des outils propres et améliorez l'entretien du caféier. Si le problème se propage, demandez un diagnostic à un technicien.",
    },
    content: {
      mg: "Rantsana maina? Esory ny rantsana maty. Manatona teknisianina raha miparitaka ny olana.",
      fr: "Rameaux secs ? Retirez le bois mort. Consultez un technicien si le problème progresse.",
    },
  },
  {
    id: "F14",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-pests-diseases",
    subcategoryId: "cafe-bugs",
    title: { mg: "Punaise", fr: "Punaise" },
    ussdContent: {
      mg: "Mety hanimba voninkazo sy voankafe tanora ny punaise. Jereo matetika ny hazo.",
      fr: "Les punaises peuvent abîmer les fleurs et jeunes cerises. Surveillez régulièrement les caféiers.",
    },
    ivrContent: {
      mg: "Ny punaise dia bibikely mety hanimba ny voninkazo sy ny voankafe mbola tanora. Jereo matetika ny rantsana sy ny voa. Raha betsaka ny bibikely na mihamaro ny fahasimbana dia mangataha torohevitra amin'ny teknisianina.",
      fr: "Les punaises peuvent endommager les fleurs et les jeunes cerises du caféier. Inspectez régulièrement les branches et les fruits. Si les insectes sont nombreux ou les dégâts importants, consultez un technicien.",
    },
    content: {
      mg: "Mety hanimba voninkazo sy voankafe tanora ny punaise. Jereo matetika ny hazo.",
      fr: "Les punaises peuvent abîmer les fleurs et jeunes cerises. Surveillez régulièrement les caféiers.",
    },
  },
  {
    id: "F15",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-pests-diseases",
    subcategoryId: "cafe-scale",
    title: { mg: "Cochenilles", fr: "Cochenilles" },
    ussdContent: {
      mg: "Bibikely fotsy amin'ny rantsana? Mety ho cochenilles. Jereo koa raha misy vitsika.",
      fr: "Des amas blancs sur les rameaux peuvent être des cochenilles. Surveillez aussi les fourmis.",
    },
    ivrContent: {
      mg: "Ny cochenilles dia bibikely madinika mety ho hita amin'ny ravina sy rantsan-kafe. Mety ho fotsifotsy toy ny landihazo izy ireo. Jereo koa raha misy vitsika. Raha mihamaro ireo bibikely dia mangataha torohevitra.",
      fr: "Les cochenilles sont de petits insectes présents sur les feuilles et les rameaux. Certaines forment des amas blanchâtres ressemblant à du coton. Surveillez les fourmis et demandez conseil si l'infestation augmente.",
    },
    content: {
      mg: "Bibikely fotsy amin'ny rantsana? Mety ho cochenilles. Jereo koa raha misy vitsika.",
      fr: "Des amas blancs sur les rameaux peuvent être des cochenilles. Surveillez aussi les fourmis.",
    },
  },
  {
    id: "F16",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-pests-diseases",
    subcategoryId: "cafe-sooty",
    title: { mg: "Fumagine", fr: "Fumagine" },
    ussdContent: {
      mg: "Sosona mainty amin'ny ravina? Mety ho fumagine. Jereo raha misy cochenilles.",
      fr: "Une couche noire sur les feuilles peut être de la fumagine. Recherchez les cochenilles.",
    },
    ivrContent: {
      mg: "Raha misy sosona mainty amin'ny ravin-kafe dia mety ho fumagine izany. Matetika izy io dia mifandray amin'ny bibikely mamoaka ranoka mamy, toy ny cochenilles. Jereo ny fisian'ireo bibikely ary mangataha torohevitra hifehezana azy.",
      fr: "Une couche noire sur les feuilles peut être de la fumagine. Elle se développe souvent sur les sécrétions sucrées de certains insectes, notamment les cochenilles. Recherchez ces insectes et demandez conseil pour maîtriser le problème.",
    },
    content: {
      mg: "Sosona mainty amin'ny ravina? Mety ho fumagine. Jereo raha misy cochenilles.",
      fr: "Une couche noire sur les feuilles peut être de la fumagine. Recherchez les cochenilles.",
    },
  },
  {
    id: "F17",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-harvest-processing",
    subcategoryId: "cafe-picking",
    title: { mg: "Fiotazana", fr: "Récolte" },
    ussdContent: {
      mg: "Mioty voankafe mena sy masaka. Aza ahintsana ny hazo. Avereno ny fiotazana.",
      fr: "Récoltez les cerises rouges et mûres. Ne secouez pas les branches. Faites plusieurs passages.",
    },
    ivrContent: {
      mg: "Rehefa mena sy masaka tsara ny voankafe dia azo otazana. Mioty amin'ny tanana ary aza ahintsana ny hazo. Tsy miara-masaka ny voa rehetra ka mila averina imbetsaka ny fiotazana. Saraho ny voa simba.",
      fr: "Récoltez les cerises lorsqu'elles sont rouges et mûres. Cueillez-les à la main sans secouer les branches. Comme les fruits ne mûrissent pas tous ensemble, effectuez plusieurs passages et écartez les cerises abîmées.",
    },
    content: {
      mg: "Mioty voankafe mena sy masaka. Aza ahintsana ny hazo. Avereno ny fiotazana.",
      fr: "Récoltez les cerises rouges et mûres. Ne secouez pas les branches. Faites plusieurs passages.",
    },
  },
  {
    id: "F18",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-harvest-processing",
    subcategoryId: "cafe-drying-area",
    title: { mg: "Fanamainana", fr: "Séchoir" },
    ussdContent: {
      mg: "Omano ny toerana fanamainana madio sy azon'ny masoandro. Arovy amin'ny orana sy loto.",
      fr: "Préparez une aire de séchage propre et ensoleillée. Protégez le café de la pluie et des salissures.",
    },
    ivrContent: {
      mg: "Alohan'ny hanamainana ny voankafe dia manomàna toerana madio sy azon'ny masoandro. Mampiasà claie avo amin'ny tany na toerana simenitra madio. Arovy amin'ny orana, ny biby ary ny loto ny kafe.",
      fr: "Avant le séchage, préparez une surface propre et ensoleillée. Utilisez des claies surélevées ou une aire cimentée propre. Protégez les cerises de la pluie, des animaux et des salissures.",
    },
    content: {
      mg: "Omano ny toerana fanamainana madio sy azon'ny masoandro. Arovy amin'ny orana sy loto.",
      fr: "Préparez une aire de séchage propre et ensoleillée. Protégez le café de la pluie et des salissures.",
    },
  },
  {
    id: "F19",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-harvest-processing",
    subcategoryId: "cafe-dry-process",
    title: { mg: "Fomba maina", fr: "Voie sèche" },
    ussdContent: {
      mg: "Aparitaho amin'ny toerana madio ny voankafe manontolo. Ahodino matetika ary arovy amin'ny orana.",
      fr: "Étalez les cerises entières sur une surface propre. Retournez-les souvent et protégez-les de la pluie.",
    },
    ivrContent: {
      mg: "Amin'ny fomba maina dia hamainina miaraka amin'ny hodiny ny voankafe. Aparitaho amin'ny toerana madio izy ireo ary ahodino matetika. Arovy amin'ny orana sy ny hamandoana. Rehefa maina tsara vao esorina ny hodiny.",
      fr: "Avec la voie sèche, les cerises de café sont séchées entières. Étalez-les sur une surface propre et retournez-les régulièrement. Protégez-les de la pluie et de l'humidité. Retirez les enveloppes après un séchage suffisant.",
    },
    content: {
      mg: "Aparitaho amin'ny toerana madio ny voankafe manontolo. Ahodino matetika ary arovy amin'ny orana.",
      fr: "Étalez les cerises entières sur une surface propre. Retournez-les souvent et protégez-les de la pluie.",
    },
  },
  {
    id: "F20",
    regionId: "itasy",
    sectorId: "cafe-arabica",
    categoryId: "cafe-harvest-processing",
    subcategoryId: "cafe-wet-process",
    title: { mg: "Fomba mando", fr: "Voie humide" },
    ussdContent: {
      mg: "Esory ny nofon'ny voa, atao fermentation, sasao amin'ny rano madio ary hamainina.",
      fr: "Dépulpez les cerises, faites fermenter, lavez à l'eau propre puis séchez les grains.",
    },
    ivrContent: {
      mg: "Amin'ny fomba mando dia esorina aloha ny nofon'ny voankafe. Atao fermentation ny voa mba hanalana ny akora miraikitra aminy. Sasao amin'ny rano madio ary hamainina tsara. Tandremo ny fahadiovan'ny fitaovana sy ny rano.",
      fr: "Avec la voie humide, retirez d'abord la pulpe des cerises. La fermentation facilite l'élimination du mucilage. Lavez ensuite les grains avec de l'eau propre puis séchez-les soigneusement. Maintenez les équipements et l'eau propres.",
    },
    content: {
      mg: "Esory ny nofon'ny voa, atao fermentation, sasao amin'ny rano madio ary hamainina.",
      fr: "Dépulpez les cerises, faites fermenter, lavez à l'eau propre puis séchez les grains.",
    },
  },
];

export const adviceEntries: readonly AdviceEntry[] = [
  {
    id: "riz-itasy-irrigation",
    regionId: "itasy",
    sectorId: "riz",
    categoryId: "riz-irrigation-eau",
    subcategoryId: "riz-lame-eau",
    content: {
      mg: "Tano ny tanimbary amin'ny rano somary marivo ary tsy avela hijanona loatra. Asonao araka ny dingana amin'ny voly, ny toetr'ity tany ity ary ny orana, ary jereo ny fantsakana sy ny fivoahana rano mba hisorohana ny fahantrana sy ny aretina.",
      fr: "Maintenez une lame d'eau peu profonde et régulière dans la rizière lorsque la culture en a besoin, sans laisser l'eau stagner inutilement. Ajustez l'irrigation selon le stade du riz, la nature du sol et les pluies. Assurez-vous que les canaux d'entrée et d'évacuation fonctionnent correctement.",
    },
  },
  {
    id: "riz-vakinankaratra-irrigation",
    regionId: "vakinankaratra",
    sectorId: "riz",
    categoryId: "riz-irrigation-eau",
    subcategoryId: "riz-lame-eau",
    content: {
      mg: "Apetao tsara ny rano amin'ny tanimbary ary tsy avela hijanona be loatra; ampiasao araka ny fepetra ara-tany sy ny lanjan'ny orana. Jereo ny fanariana rano mba tsy hihena ny fitomboana ary hialana amin'ny zava-maniry roahina.",
      fr: "Gardez une humidité maîtrisée dans la rizière et évitez les stagnations excessives. Adaptez l'irrigation au stade du riz, au type de sol et aux pluies pour limiter les pertes et protéger la culture.",
    },
  },
  {
    id: "mais-itasy-irrigation",
    regionId: "itasy",
    sectorId: "mais",
    categoryId: "mais-irrigation-eau",
    subcategoryId: "mais-eau",
    content: {
      mg: "Apetao ny rano amin'ny voly katsaka mba tsy hisy rano be loatra, satria ny habetsahan'ny rano no mety hamitaka ny fotony. Jereo ny vanim-potoana sy ny toetr'andro mba hampifanaraka ny fanondrahana rano.",
      fr: "Contrôlez l'arrosage du maïs pour éviter un excès d'eau qui peut nuire au développement des racines et favoriser les maladies. Ajustez selon le stade de la culture et les pluies récentes.",
    },
  },
  {
    id: "cafe-vakinankaratra-irrigation",
    regionId: "vakinankaratra",
    sectorId: "cafe-arabica",
    categoryId: "cafe-maintenance",
    subcategoryId: "cafe-irrigation",
    content: {
      mg: "Apetao ny rano amin'ny kafe rehefa tsy ampy ny orana, fa aza mamela ny tany ho mando be loatra. Ny rano be dia be dia mety hiteraka aretina sy hamelaka ny fakany.",
      fr: "Complétez l'apport en eau du café quand les pluies sont insuffisantes, mais évitez les sols saturés. Un excès d'eau peut favoriser les maladies et ralentir le développement de la plante.",
    },
  },
  {
    id: "pdt-itasy-irrigation",
    regionId: "itasy",
    sectorId: "pomme-de-terre",
    categoryId: "pdt-irrigation-eau",
    subcategoryId: "pdt-fertilisation-eau",
    content: {
      mg: "Tantano ara-dalàna ny rano amin'ny ovy, saingy aza avela hameno ny tany. Rehefa tsy ampy ny orana dia manampy ny rano mba hitazomana ny fitomboana ary hialana amin'ny aretina.",
      fr: "Irriguez régulièrement la pomme de terre sans saturer le sol. En cas de manque de pluie, complétez l'eau pour maintenir une bonne croissance et éviter les maladies liées à l'excès d'humidité.",
    },
  },
  {
    id: "lait-itasy-eau-ferme",
    regionId: "itasy",
    sectorId: "lait",
    categoryId: "lait-eau-ferme",
    subcategoryId: "lait-abreuvement",
    content: {
      mg: "Tandremo ny rano ho an'ny omby amin'ny trano fiompiana. Azo atao ny manome rano madio sy maharitra, ary tsy avela hijanona ratsy eo amin'ny fitaovana fanondrahana.",
      fr: "Assurez-vous que les animaux disposent d'un accès régulier à de l'eau propre et suffisante. Le système d'abreuvement doit rester propre et fonctionnel pour éviter les troubles sanitaires.",
    },
  },
  ...coffeeAdviceEntries,
];

export const allCoffeeAdviceEntries: readonly AdviceEntry[] =
  coffeeAdviceEntries;

export function getAdviceText(
  entry: AdviceEntry,
  channel: "ussd" | "ivr" = "ussd",
  language: LanguageCode = "fr",
): string {
  const source =
    channel === "ussd"
      ? (entry.ussdContent ?? entry.content)
      : (entry.ivrContent ?? entry.content);

  if (!source) {
    return "";
  }

  return getLocalizedLabel(source, language);
}

export function getLocalizedLabel(
  value: LocalizedText,
  language: LanguageCode,
): string {
  return value[language] ?? value.fr;
}

export function getAdviceActionMenu(language: LanguageCode): string {
  if (language === "mg") {
    return "1. Hamerina\n0. Hiverina\n9. Hivoaka";
  }

  return "1. Répéter\n0. Retour\n9. Quitter";
}

export function getUssdInvalidChoiceMessage(language: LanguageCode): string {
  return language === "mg" ? "Safidy tsy mety" : "Choix invalide";
}

export function getIvrInvalidChoiceMessage(language: LanguageCode): string {
  return language === "mg" ? "Avereno ny safidy" : "Répétez votre choix";
}

export function getUssdTimeoutMessage(language: LanguageCode): string {
  return language === "mg"
    ? "Tapitra ny session rehefa timeout"
    : "Session expirée après délai";
}

export function getIvrTimeoutMessage(language: LanguageCode): string {
  return language === "mg" ? "Averina ny menu" : "Menu répété";
}
