# USSD + IVR MVP (Express + TypeScript)

Petit projet de démonstration réunissant un menu USSD et un serveur vocal interactif (IVR) avec Express.js.

## Fonctionnalités

- `POST /ussd` : parcours bilingue partagé avec l'IVR, avec sélection de la langue, des régions, des filières, des catégories, des sous-catégories et du conseil.
- `POST /ivr/voice` : point d'entrée vocal Twilio Voice, avec menu DTMF.
- `POST /ivr/gather` : traite la touche saisie par l'appelant.
- `POST /ivr/status` : journalise les changements d'état d'un appel.
- `GET /api/simulations` : liste les 20 parcours prédéfinis F01-F20 avec filtres optionnels.
- `GET /api/simulations/:id` : détail d'un parcours prédéfini.
- `GET /api/simulations/categories` : catalogue des secteurs, catégories et sous-catégories disponibles.
- `GET /audio/...` : sert les fichiers audio déposés dans `public/audio/`.
- `GET /health` : vérification simple du serveur.

Le parcours actuel propose deux régions (`Itasy`, `Vakinankaratra`) et cinq filières (`Riz`, `Maïs`, `Café Arabica`, `Lait`, `Pomme de terre`).
Après chaque conseil, le menu propose les options bilingues suivantes :

- Français : `1. Répéter`, `0. Retour`, `9. Quitter`
- Malagasy : `1. Hamerina`, `0. Hiverina`, `9. Hivoaka`

Les choix « demande de rappel » et « demande enregistrée » sont simulés : aucune donnée n'est sauvegardée et aucun appel de rappel n'est réellement déclenché.

## API REST des parcours prédéfinis

Les parcours prédéfinis sont exposés en lecture seule pour un frontend web ou mobile.

### Endpoints

```http
GET /api/simulations
GET /api/simulations?channel=USSD
GET /api/simulations?language=fr
GET /api/simulations?region=Itasy&sector=coffee
GET /api/simulations/F08
GET /api/simulations/categories
GET /api/simulations/history
POST /api/simulations/history
GET /api/sessions
GET /api/sessions/:id
POST /api/sessions
```

### Paramètres pris en charge

- `channel` : `USSD` ou `IVR`
- `language` : `mg` ou `fr`
- `region` : `Itasy`, `Vakinankaratra` ou nom localisé
- `sector` : identifiant ou libellé de filière (par exemple `coffee`, `riz`, `lait`)

### Exemple de réponse

```json
{
  "success": true,
  "data": {
    "id": "F08",
    "region": {
      "code": "ITASY",
      "name": { "mg": "Itasy", "fr": "Itasy" }
    },
    "sector": {
      "code": "CAFE_ARABICA",
      "name": { "mg": "Kafe Arabika", "fr": "Café Arabica" }
    },
    "category": {
      "code": "CAFE_ENTRETIEN",
      "name": { "mg": "Fikojakojana", "fr": "Entretien" }
    },
    "subcategory": {
      "code": "CAFE_IRRIGATION",
      "name": { "mg": "Fanondrahana", "fr": "Irrigation" }
    },
    "advice": {
      "ussd": { "mg": "...", "fr": "..." },
      "ivr": { "mg": "...", "fr": "..." }
    }
  }
}
```

Les codes techniques sont stables et indépendants des libellés affichés.

### Historique des simulations

Le backend conserve un historique en mémoire des parcours consultés ou terminés. Cela permet au frontend de reconstruire une liste récente de recommandations et d’afficher leur statut.

Exemple de création d’un historique :

```http
POST /api/simulations/history
Content-Type: application/json

{
  "simulationId": "F08",
  "channel": "IVR",
  "language": "fr",
  "region": "ITASY",
  "sector": "CAFE_ARABICA",
  "status": "completed"
}
```

Exemple de lecture :

```http
GET /api/simulations/history?channel=IVR&language=fr&status=completed
```

Les filtres supportés sont : `simulationId`, `channel`, `language`, `region`, `sector`, `status`.

### Sessions actives

Le backend expose aussi un historique léger des sessions courantes/terminées en mémoire pour le frontend ou le debug administratif.

Exemple de création :

```http
POST /api/sessions
Content-Type: application/json

{
  "sessionId": "call-001",
  "channel": "IVR",
  "language": "fr",
  "region": "Itasy",
  "sector": "CAFE_ARABICA",
  "currentStep": "advice",
  "status": "active"
}
```

Exemple de lecture :

```http
GET /api/sessions?channel=IVR&language=fr&status=active
```

## Prérequis

- Node.js 18 ou plus récent (Node 20 LTS recommandé)
- npm

## Installation sous Windows PowerShell

```powershell
cd chemin\vers\ussd-ivr-express-mvp
npm install
Copy-Item .env.example .env
npm run dev
```

Le serveur démarre sur `http://localhost:3000`.

Tester la santé du serveur :

```powershell
Invoke-RestMethod http://localhost:3000/health
```

## Exemple de menu de fin de conseil

### USSD (français)

```text
Conseil: Itasy - Riz - Irrigation et gestion de l'eau - Lame d'eau peu profonde
Maintenez une lame d'eau peu profonde et régulière...
1. Répéter
0. Retour
9. Quitter
```

### USSD (malagasy)

```text
Torohevitra: Itasy - Riz - Rano sy fitantanana ny rano - Lame rano tsy matevina
...\n1. Hamerina
0. Hiverina
9. Hivoaka
```

### IVR

Après la lecture du conseil, le serveur réannonce les mêmes choix `1`, `0` et `9` dans la langue sélectionnée. En cas de saisie invalide, il annonce `Répétez votre choix` ou `Avereno ny safidy` puis réinvite l'appelant à choisir. En cas de délai d'attente, il répète le menu courant sans revenir au début du parcours.

## Tester le menu USSD localement

Premier écran :

```powershell
Invoke-WebRequest -Method POST -Uri http://localhost:3000/ussd -ContentType "application/x-www-form-urlencoded" -Body "sessionId=demo1&serviceCode=*123%23&phoneNumber=%2B261340000000&text="
```

Écran culture (choisir `1`, puis `1` pour le riz) :

```powershell
Invoke-WebRequest -Method POST -Uri http://localhost:3000/ussd -ContentType "application/x-www-form-urlencoded" -Body "sessionId=demo1&serviceCode=*123%23&phoneNumber=%2B261340000000&text=1"
Invoke-WebRequest -Method POST -Uri http://localhost:3000/ussd -ContentType "application/x-www-form-urlencoded" -Body "sessionId=demo1&serviceCode=*123%23&phoneNumber=%2B261340000000&text=1%2A1"
```

Un fournisseur USSD envoie généralement l'historique des choix dans `text`, séparés par `*`. Vérifie le format exact attendu par ton agrégateur avant le déploiement.

## Tester l'IVR

L'IVR est prévu pour un webhook Twilio Voice. Un simple appel HTTP peut vérifier que le serveur renvoie du XML :

```powershell
Invoke-WebRequest -Method POST -Uri http://localhost:3000/ivr/voice -ContentType "application/x-www-form-urlencoded" -Body ""
```

La réponse doit contenir du XML TwiML (`<Response>`, `<Gather>`, etc.).

Pour recevoir de vrais appels, le fournisseur téléphonique doit pouvoir joindre ton serveur depuis Internet. En développement, utilise un tunnel HTTPS comme ngrok, puis configure le webhook vocal Twilio avec :
`https://TON-URL-PUBLIQUE/ivr/voice` (méthode HTTP POST).

Pour que les actions `<Gather>` soient routées correctement, utilise l'URL complète du tunnel pour les attributs `action`/`Redirect` si ton fournisseur ne résout pas les chemins relatifs depuis la base publique. En production, configure les URL publiques absolues et valide les webhooks entrants selon les recommandations de ton fournisseur.

## Audio IVR personnalisé

1. Place un fichier WAV à `public/audio/welcome.wav`.
2. Dans `.env`, définis par exemple `PUBLIC_BASE_URL=https://TON-URL-PUBLIQUE`.
3. Redémarre le serveur.
4. Vérifie que `https://TON-URL-PUBLIQUE/audio/welcome.wav` est accessible publiquement en HTTPS.

Sans audio personnalisé ou sans `PUBLIC_BASE_URL`, le serveur utilise la synthèse vocale Twilio (`<Say>`). Le fichier audio n'est pas inclus : ajoute un enregistrement dont tu possèdes les droits.

## Construire et lancer

```powershell
npm run typecheck
npm run build
npm start
```

## Architecture

L'application reste un monolithe Express/TypeScript. Le point de composition
`src/main.ts` charge et valide la configuration, construit les cas d'utilisation
et les injecte dans `src/app.ts`.

```text
src/
  app.ts
  main.ts
  config/
    environment.ts
  modules/
    ussd/
      domain/services/       # règles et transitions du menu
      application/use-cases/ # orchestration des requêtes USSD
      presentation/          # contrôleur et route Express
    ivr/
      domain/services/       # menu et décisions DTMF
      application/use-cases/
      presentation/          # contrôleurs, routes et mapper TwiML
  shared/presentation/       # gestion HTTP centralisée des erreurs
public/
  audio/      # fichiers audio personnalisés
tests/
  ussd-ivr.integration.test.cjs
```

Les règles de navigation ne dépendent ni d'Express ni d'un fournisseur. Le MVP
est stateless : le fournisseur USSD renvoie l'historique des choix à chaque
requête et aucune demande de rappel ni aucun statut d'appel ne sont persistés.
Les dossiers d'infrastructure spécifiques aux fournisseurs ou à la persistance
ne sont pas ajoutés tant qu'aucun adaptateur correspondant n'est opérationnel.

Les limites actuelles demeurent : Africa's Talking et Twilio ne sont pas
configurés par le projet, les signatures de webhook ne sont pas vérifiées et la
demande de rappel est seulement simulée. Avant la production, ajoutez les
adaptateurs réels, leur configuration/secrets hors dépôt et les vérifications
de signature prescrites par le fournisseur.

## Tests et vérifications

```powershell
npm run typecheck
npm test
npm run build
```

`npm test` compile l'application puis exécute les tests intégrés avec le runner
`node:test` (aucune dépendance de test supplémentaire).

## Important avant production

- Ajouter la validation de signature des webhooks du fournisseur.
- Utiliser des URL HTTPS publiques.
- Ajouter une vraie persistance (base de données) si les demandes doivent être conservées.
- Mettre en place journalisation, gestion des erreurs et limites de requêtes.
- Adapter le format USSD au fournisseur choisi (Africa's Talking, opérateur local, etc.).
- Vérifier les contraintes audio et le format de réponse avec le fournisseur IVR.
