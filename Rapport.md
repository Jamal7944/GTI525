<h1 align=center> GTI525 - Laboratoire #01 </h1>
<h2 align=center style="color:grey"><i>Création d'un front-end</i><h2>
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
<td>12 juin 2024</td>
</tr>

</table>

<!-- 
Consigne (ALL):

Un court rapport est demandé. Vous devez répondre aux questions suivantes (maximum 5 pages). Une pénalité sera
appliquée pour les fautes de français (voir le barème) et une mise en page incorrecte ou un manque de rigueur dans la
présentation.
R1: Décrivez l'architecture logicielle utilisée, ainsi que l'organisation et le rôle des différents éléments (classes, fonctions) de votre code JavaScript.
R2: Décrivez brièvement l'algorithme utilisé pour générer la liste des stations météorologiques (partie de gauche).
R3: Décrivez brièvement l'algorithme utilisé pour calculer les statistiques globales et par mois.
R4: De quelques façon avez-vous subdivisé les tâches en équipe? Décrivez le rôle et les tâches assignées à chacun des
membres.
R5: Notez qu'une brève introduction et conclusion est également demandée.
 -->

## Introduction
<!-- R5: Notez qu'une brève introduction et conclusion est également demandée. -->
Dans ce premier projet de laboratoire pour le cours GTI525, nous devrons mettre en œuvre les connaissances acquises durant le cours afin de créer une application web permettant de visualiser l'historique météorologique de plusieurs stations situées dans différentes provinces du Canada. Pour ce premier laboratoire, nous devons nous concentrer sur la création d'une application simple en _front-end_ uniquement, qui nous permettra de naviguer et de visualiser sous forme de tableau les informations météorologiques. Nous devrons utiliser JavaScript ainsi que HTML pour manipuler et afficher les informations.


### Organisation de l'équipe
<!-- R4: De quelques façon avez-vous subdivisé les tâches en équipe? Décrivez le rôle et les tâches assignées à chacun des
membres. -->
Nous avons séparer les tâches du projet selon la séparation définie dans le document de livrable du laboratoire. En essayant un partage équitable des tâche nous avons la séparation suivante : 

| Tâches |                 Définition                 |   Personne(s)   |
|:------:|:------------------------------------------ |:---------------:|
|   T1   | Structure de page, en-tête et pied de page | Jean-Félix      |
|   T2   | Sélection de la station                    | Jamal           |
|   T3   | Sélection de la plage de date              | Jamal <br> Jean-Félix |
|   T4   | Vue des données                            | Steven          |
|   T5   | Vue des statistiques                       | Gael            |

Le rapport a été fait en coopération avec l'ensemble de l'équipe, avec Jean-Félix s'occupant des partie général ainsi que de la structure du fichier.

## 1. Architecture logicielle
<!-- R1: Décrivez l'architecture logicielle utilisée, ainsi que l'organisation et le rôle des différents éléments (classes, fonctions) de votre code JavaScript. -->
Pour facilité le code, et le déploiement, nous avons choisi d'utilisé le cadriciel _[Vue.JS](https://vuejs.org/)_. Nous avons aussi utilisé la librairie _[Bootstrap (V.5.3.3)](https://getbootstrap.com/)_ afin d'avoir un visuelle plus beau et harmonieux ainsi que pour gérer les differents grandeur d'écran. Finalement afin d'importer les données de type CSV dans le JavaScript, nous avons utilisé la librairie (_Parser_) [PapaParse](https://github.com/mholt/PapaParse). L'utilisation de VueJS combinée avec Bootstrap nous a permis de gagner du temps sur le visuel de l'application ainsi que la mise en lien des actions et données entre le HTML et le Javascript. Nous avons d'ores et déjà mis en place un système de _component_ pour séparer les résponsabilité de chaque élements de l'application et instaurer une hierarchie entre les componsants.



### 1.1. Organisation

```
project
│   README.md
│   .gitignore 
│   <config files> 
│
└─── public
│   │   index.html
│   │   favicon.ico
│   
└─── src
│   │   main.js
|   |
│   └───components
│   │   │   App.vue
│   │   │   DataStatsMenu.vue
|   |   |   Navigation.vue
│   │   │
│   └───assets
│   │   │   Logo.png
│   │   │   ...
│   │   │
│   └───css
│   │   │   Vue.css
│   │   │   main.css
│   │   │   ...
│   │   │
│   └───html
│   │   │   vue.html
│   │   │   DataStatsMenu.html
|   |   |   Navigation.html
│   │   │
│   └───js
│       │   Vue.js
│       │   bootstrap.bundle.min.js
│       │   DataStatsMenu.js
|       |   Navigation.js
│       │   ...
│       │
```


## 2. Algorithme list des stations métérologiques
<!-- R2: Décrivez brièvement l'algorithme utilisé pour générer la liste des stations météorologiques (partie de gauche). -->

Lorsque l'application se lance, la fonction _loadStations()_ effectue un fetch pour récupérer le fichier _Station Inventory EN.csv_. Un tri est fait sur l'objet ListeStations obtenu afin de ne garder que les stations dont le fichier .csv est actuellement présent dans les données. Nous avons au préalable initialisé un objet ProvinceStations qui va contenir pour chaque province les stations disponnibles dans les fichiers. Pour chaque station récupérée via le fetch, l'algorithme va créer un attribut pour chaque nouvelle province rencontrée et y stocker chaque station correspondante.
Voici une version de pseudo code qui explique la création de ProvinceStations

Pour chaque station dans la ListeStations:
    Récupérer la province de la station
    Si la province n'existe pas dans ProvinceStations:
        Créer une nouvelle entrée pour cette province dans ProvinceStations avec une liste vide
    Ajouter la station à la liste des stations de cette province dans ProvinceStations
    
L'objet PronvinceStations est ensuite directement lié au html grâce à VueJS.

## 3. Algorithme statistique globales (et /mois)
<!-- R3: Décrivez brièvement l'algorithme utilisé pour calculer les statistiques globales et par mois. -->


## Conclusion
<!-- R5: Notez qu'une brève introduction et conclusion est également demandée. -->
Ce projet nous a permis de nous perfectionner dans les techniques de base du web tels que le rendu d'une interface graphique à l'aide de HTML et de style personnalisé CSS et l'utilisation de JavaScript pour rendre la navigation de la page plus dynamique. Pour certains d'entre nous, le premier laboratoire a permis la découverte de VueJS et ses avantages. Selon nous, il est étrange de faire le traitement des données uniquement dans le front-end, mais pour les besoins du laboratoire, Nous avons fait un bon travail.
