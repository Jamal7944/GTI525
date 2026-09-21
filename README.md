# GTI525 — Application météo (API REST, MongoDB, cache & carte)

Application web full-stack développée dans le cadre du cours **GTI525 – Développement d'applications Web** (ÉTS Montréal, été 2024). Le projet consomme des données météorologiques historiques (Environnement Canada), les expose via une API REST avec mise en cache, et les affiche sur une carte interactive du Canada.

## Fonctionnalités

- **API RESTful** (Express) exposant les stations, l'historique météo et les prévisions par station
- **Base de données MongoDB** peuplée automatiquement à partir de fichiers CSV historiques (script Python)
- **Cache structuré** des requêtes API pour limiter les appels redondants
- **Carte interactive** (Leaflet) affichant la température actuelle et les prévisions à venir par station, avec code couleur jour/nuit
- **Prévisions horaires passées et à venir** consultables par station, date et heure

## Stack technique

| Composant | Technologies |
|---|---|
| Front-end | Vue 3, Vue Router, Bootstrap, Leaflet, Axios |
| Back-end | Node.js, Express, MongoDB (driver natif), node-cache |
| Ingestion de données | Python (script d'import CSV → MongoDB) |
| Infrastructure | Docker / docker-compose |

## Architecture

Le projet est séparé en trois modules indépendants :

```
├── client/          # Application Vue 3 (SPA)
├── server/          # API REST Express
├── python-script/   # Script d'import des données météo (CSV → MongoDB)
└── docker-compose.yaml
```

Diagrammes de classes disponibles : [`ClientDiagram.png`](./ClientDiagram.png) (front-end) et [`Server.png`](./Server.png) (back-end). Le détail des choix de conception (structure MongoDB, routes API, gestion du cache, implémentation de la carte) est documenté dans [`rapport.md`](./rapport.md).

## Installation

### 1. Base de données (Docker)

1. Installer [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/) (Windows, Linux, Mac)

   <details>
   <summary>Pour Linux</summary>
   <br>
   Le client visuel est disponible, mais vous pouvez installer uniquement <b>docker</b> et <b>docker-compose</b> via votre gestionnaire de paquets.
   </details>

2. À la racine du projet, lancer :
   ```bash
   docker compose up -d
   ```
   Ceci démarre MongoDB et exécute automatiquement le script Python qui peuple la base si elle est vide.

   <details>
   <summary>Pour Linux</summary>
   <br>
   S'assurer que le dossier <b>data</b> est accessible en écriture : <code>sudo chmod 777 data</code>.
   </details>

### 2. Client (Vue.js)

```bash
cd client
npm install -g @vue/cli   # si non installé
npm install
npm run serve             # démarrage en mode développement
npm run build              # build de production
npm run lint                # lint + correctifs automatiques
```

### 3. Serveur (Express)

```bash
cd server
npm install
npm start
```

> Le client et le serveur doivent actuellement être démarrés manuellement (hors Docker) : la conteneurisation complète a été mise de côté à cause de conflits CORS entre conteneurs — voir `rapport.md` pour le détail.

## Équipe

Projet réalisé en équipe de 4 dans le cadre du GTI525 (groupe 01, été 2024) :
Jean-Félix St-Hilaire, Gaël Fortier, **Jamal Attou**, Steven Leblanc-Lafond.

Répartition des tâches : API REST, import des données MongoDB, cache des requêtes, carte interactive, rapport — voir `rapport.md` pour le détail complet.
