<h1 align=center> GTI525 - Laboratoire #02 </h1>
<h2 align=center style="color:grey"><i>code dorsale et API</i><h2>
<br>

<table align=center>
<tr>
<td colspan="2" align="center"><img src="https://www.etsmtl.ca/getmedia/e599841c-6724-4a4f-97bb-89cf0e9d7fcc/Logo_ETS_TypoGrise_D_FR_1" width=225px /></td>
</tr>
<tr>
<td><b>Étudiants</b></td>
<td>Jean-Félix ST-HILAIRE
<br>
Gaël FORTIER
<br>
Jamal ATTOU 
<br>
Steven LEBLANC-LAFOND
</td>
</tr>
<tr>
<td><b>Code Permanents</b></td>
<td>STHJ09099500
<br>
FORG82860104
<br>
ATTJ63300201
<br>
LEBS22129401
</td>
</tr>
<tr>
<td><b>Cours</b></td>
<td>GTI525</td>
</tr>
<tr>
<td><b>Groupe</b></td>
<td>01</td>
</tr>
<tr>
<td><b>Session</b></td>
<td>Été 2024</td>
</tr>
<tr>
<td><b>Charge de <br> laboratoire</b></td>
<td>Amna Snene</td>
</tr>
<tr>
<td><b>Date</b></td>
<td>11 juillet 2024</td>
</tr>

</table>

<!-- 
Consigne (ALL):

Un court rapport est demandé. Vous devez répondre aux questions suivantes (maximum 6 pages). Une pénalité sera appliquée pour les fautes de français (voir le barème) et une mise en page incorrecte ou un manque de rigueur dans la présentation.

* **R1**: Décrivez l'architecture logicielle utilisée pour la partie "front-end" de ce livrable et comment elle a évolué par rapport au livrable 1, ainsi que pour la partie "back-end". Décrivez brièvement l'organisation et le rôle des différents éléments (classes, fonctions) de votre code JavaScript. Si vous avez utilisé des cadriciels, mentionnez-les et indiquez de quelle façon ils sont utilisés.
* **R2**: Décrivez de quelle façon vous vous y êtes pris pour traiter ("parser") et extraire les différentes données pertinentes des APIs externes (formats CSV et XML/RSS). Si vous avez utilisé des librairies, mentionnez-les et décrivez de quelle façon elles sont utilisées. Décrivez également comment vous gérez (du point de vue interface et de votre code) les données demandées par l'utilisateur qui sont manquantes dans les sources externes (par exemple, les informations météo historiques qui ne sont pas disponibles pour une station et journée donnée).
* **R3**: Comment gérez-vous les conditions d'erreurs des différentes requêtes (du "front-end" au "back-end" ainsi que du "back-end" aux APIs externes), tant du point de vue de votre code que dans l'interface de votre site?
* **R4**: Décrivez de quelle manière votre code dorsal utilise le système de modules ES6. Mentionnez les modules importés et/ou exportés. Avez-vous rencontré certaines problématiques particulières? 
* **R5**: De quelques façon avez-vous subdivisé les tâches en équipe pour ce livrable? Décrivez le rôle et les tâches assignées à chacun des membres.
* **R6**: Notez qu'une brève introduction et conclusion sont également demandées. 
 -->

<div style="page-break-after: always;"></div>

## Introduction
<!-- R6: Notez qu'une brève introduction et conclusion est également demandée. -->
Au cours du second laboratoire nous devrons intégrer l'architecture de la partie dorsale (*backend*) de notre application et ajouter de nouvelles fonctionnalités à cette dernière. Parmi ces nouvelles fonctionnalités on retrouve la possibilité d'obtenir des prévisions météorologiques pour une station donnée ainsi que les détails d'une météo pour une date précise donnée passée. Nous aborderons dans ce rapport les tenants et aboutissants de ce second laboratoire à travers les différentes tâches effectuées, les difficultés rencontrées et les solutions apportées au projet.

### Organisation de l'équipe
<!-- R5: De quelques façon avez-vous subdivisé les tâches en équipe pour ce livrable? Décrivez le rôle et les tâches assignées à chacun des membres. -->
Nous avons séparer les tâches du projet selon la séparation définie dans le document de livrable du laboratoire. En essayant un partage équitable des tâche nous avons la séparation suivante : 

| Tâches |                 Définition                 |   Personne(s)   |
|:------:|:------------------------------------------ |:---------------:|
|   T1   |             Intégration de l'application dorsale                               |  Jamal               |
|   T2   |             Informations météo pour une journée donnée passée                              |      Gael et Jean-Félix           |
|   T3   |             Prévisions météo (pour aujourd'hui et les prochains jours)                               |      Steven et Jean-Félix           |
|   T4   |             Rapport                             |  Tous               |

## 1. Architecture logicielle
<!-- R1: écrivez l'architecture logicielle utilisée pour la partie "front-end" de ce livrable et comment elle a évolué par rapport au livrable 1, ainsi que pour la partie "back-end". Décrivez brièvement l'organisation et le rôle des différents éléments (classes, fonctions) de votre code JavaScript. Si vous avez utilisé des cadriciels, mentionnez-les et indiquez de quelle façon ils sont utilisés. -->
Afin de conserver une structure facile à manipuler nous avons décidé de diviser le projet en deux dossiers distincts. Cela nous permet entre autres de gérer les packages et librairies spécifiques à la partie frontale ou dorsale. Il y a donc un package module dans chacun des dossiers. Le premier dossier *client* est destiné exclusivement à l'application frontale (*frontend*) et ses librairies. C'est dans ce dossier que nous retrouvons l'intégralité du laboratoire 1 avec de nouveaux ajouts. Le second dossier *server* va contenir l'ensemble du code et des librairies dédiées à l'application dorsale ajoutée au cours du laboratoire.

### Front-End (Lab01)
Nous reprenons le code issu du premier laboratoire avec son cadriciel _[Vue.JS](https://vuejs.org/)_ et la librairie _[Bootstrap](https://getbootstrap.com/)_. Les vrais changement apportés concernent les deux nouveaux  *components* apportés à savoir *ForecastWeek.vue* et *PastHourlyForecast.vue*
### Back-End

Voici l'arborescence globale de l'application

## Structure de Répertoires

### Client

- **Configuration et dépendances**
  - `.gitignore`
  - `.prettierignore`
  - `.prettierrc`
  - `babel.config.cjs`
  - `jsconfig.json`
  - `package-lock.json`
  - `package.json`
  - `vue.config.js`

- **Archives**
  - **lab01/**

- **Public**
  - `favicon.ico`
  - `index.html`
  - **js/**
    - `bootstrap.bundle.min.js`
  - **Laboratoire_1_-_Enonces-20240516/**
    - `Lab1_CSV.zip`
    - **Lab1_CSV/**
    
- **Src**
  - `App.vue`
  - `main.js`
  - **Assets/**
  - **Components/**
  - **Css/**
  - **Html/**
  - **Js/**
    - **Stations/**
    - **Utils/**

### Server

- **Configuration et dépendances**
  - `.gitignore`
  - `eslint.config.mjs`
  - `package-lock.json`
  - `package.json`

- **Data**
  - `station_mapping.json`

- **Src**
  - `index.js`
  - `routes.js`
  - **Stations/**
  - **Utility/**


## 2. API et parser
<!-- R2: Décrivez de quelle façon vous vous y êtes pris pour traiter ("parser") et extraire les différentes données pertinentes des APIs externes (formats CSV et XML/RSS). Si vous avez utilisé des librairies, mentionnez-les et décrivez de quelle façon elles sont utilisées... -->
Gestion des classes
Classe parser
Objet -> Json -> ...
### 2.1 Gestion des données manquantes
<!-- ...Décrivez également comment vous gérez (du point de vue interface et de votre code) les données demandées par l'utilisateur qui sont manquantes dans les sources externes (par exemple, les informations météo historiques qui ne sont pas disponibles pour une station et journée donnée). -->

## 3. Gestion des conditions d'erreur
<!-- R3: Comment gérez-vous les conditions d'erreurs des différentes requêtes (du "front-end" au "back-end" ainsi que du "back-end" aux APIs externes), tant du point de vue de votre code que dans l'interface de votre site? -->
Parler des try catch, promesses utilisées ? 
## 4. Code dorsale et module ES6
<!-- R4: Décrivez de quelle manière votre code dorsal utilise le système de modules ES6. Mentionnez les modules importés et/ou exportés. Avez-vous rencontré certaines problématiques particulières?  -->
L'une des contraintes du laboratoire portait sur l'utilisation du systèmes de modules ES6 et non CommonJS. Cela recquiert de mentionner le mot clé *import* et non *require* pour utiliser une librairie ou simplement un fichier externe. 
Parmis les modules importés on retrouve par exemple les différents modules javascripts liés aux components tels que *NavigationMenu* ou *DataStatMenu* qui sont importés dans le fichier *Vue.js*, le module du component parent *App.vue*
On peut aussi citer les librairies publiques telles que _[papaparse](https://www.npmjs.com/package/papaparse)_.
Pour exporter nos modules nous avons optés pour deux façons de faire. Tout d'abord celle utilisée par *Vue* pour définir le module javascript d'un composant avec "*export default {}*". Nous avons aussi utilisé la syntaxe "*module.export*" pour exporter des variables ou des fonctions (classes).
Nous avons par ailleurs régulièrement rencontré un problème d'import lié à la syntaxe utilisée au niveau du fichier d'import. En effet en omettant le *.js* à la fin du fichier dans le nom du chemin (relatif ou absolu) le module exporté n'était pas correctement trouvé et l'import ne fonctionnait pas.
## Conclusion
<!-- R6: Notez qu'une brève introduction et conclusion est également demandée. -->
Le point principale du second laboratoire a été la mise en place de l'application dorsale et toutes les modifications qui en ont découlées. Nous avons du revoir l'architecture globale du projet et ajuster le système d'import pour convenir à la contrainte technique du laboratoire. La mise en place du server backend a permis d'organiser la communication avec les APIs externes pour ajouter des fonctionnalités à notre application. Toujours en adaptant la structure du cadriciel _[Vue.JS](https://vuejs.org/)_ nous avons créer de nouveaux composant pour chaque nouvelle fonctionnalité.
