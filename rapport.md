<h1 align=center> GTI525 - Laboratoire #02 </h1>
<h2 align=center style="color:grey"><i>API RESTful, MongoDB, cache et carte</i><h2>
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
<td>7 août 2024</td>
</tr>
</table>

<!--
R1: Décrivez en détail les choix de conception effectués pour votre API REST (pour répondre aux différentes fonctionnalités demandées) (total 10 points). Vous devez notamment décrire:
	- Les verbes et noms des différentes ressources (3 points)
	- La structure arborescente (collections) (2 points)
	- Le ou les formats de sortie (1 points)
	- Une justification pour vos choix, et les limites potentielles (4 points)

R2: Décrivez le schéma et la structure de votre base de données MongoDB (total 10 points). Vous devez notamment décrire:
	- Les collections pour les différents requis du TP et la structure des documents (5 points).
	- Justifiez vos choix de conception et les limites potentielles. (5 points)

R3: Décrivez les modifications apportées à l'architecture logicielle de votre back-end et de votre front-end par rapport au livrable précédent (total 10 points). Décrivez notamment:
	- L'organisation et le rôle des différents éléments (classes, fonctions) de votre code JavaScript en lien avec votre diagramme de classes, ainsi que l'utilisation de patrons de conception (si pertinent) (5 points).
	- Justifiez vos choix de conception et les limites potentielles. (5 points)

R4: Décrivez de quelle manière vous avez implémenté les tâches reliées à la carte des données météo, plus particulièrement T4.3 et T4.4. Quelles problématiques avez-vous rencontré, et comment les avez-vous résolues? (8 points)

R5: Comment procédez-vous pour retirer ou mettre à jour de manière périodique les entrées périmées du cache sur le back-end? (4 points)

R6: De quelques façon avez-vous subdivisé les tâches en équipe pour ce TP? Décrivez le rôle et les tâches assignées à chacum des membres. (4 points)

R7: Notez qu'une brève introduction et conclusion sont également demandées. (4 points)-->

## Introduction
<!-- R7: Notez qu'une brève introduction et conclusion sont également demandées. (4 points) -->

### Organisation de l'équipe
<!--R6: De quelques façon avez-vous subdivisé les tâches en équipe pour ce TP? Décrivez le rôle et les tâches assignées à chacum des membres. (4 points) -->

Nous avons séparer les tâches du projet selon la séparation définie dans le document de livrable du laboratoire. En essayant un partage équitable des tâche nous avons la séparation suivante :

| Tâches | Définition                                                      | Personne(s) |
| :----: | :-------------------------------------------------------------- | :---------: |
|   T1   | API REST                                                        |    Jamal    |
|   T2   | Importation des données météo moyennes historiques dans MongoDB | Jean-Félix  |
|   T3   | Cache structuré des requêtes à l'API                            |   Steven    |
|   T4   | Affichage des données météo sur une carte                       |    Gaël     |
|   T5   | Rapport                                                         |    Tous     |

## MongoDB
<!--Décrivez le schéma et la structure de votre base de données MongoDB (total 10 points)-->
#### Les collections et la structure des documents

#### Choix de conception et limitations

## Architecture logicielle
<!--R3: Décrivez les modifications apportées à l'architecture logicielle de votre back-end et de votre front-end par rapport au livrable précédent (total 10 points)-->
#### Diagramme de classe et patrons de conception

#### Organisation et rôles des classes et fonctions

#### Choix de conception et limitations

## Carte météo
<!--R4: Décrivez de quelle manière vous avez implémenté les tâches reliées à la carte des données météo, plus particulièrement T4.3 et T4.4. Quelles problématiques avez-vous rencontré, et comment les avez-vous résolues? (8 points)-->
#### Implémentation 
Pour la première tâche, un onglet nommé "Carte" contenant la carte ainsi que les fonctionnalités qui y sont rattachés a été ajouté. Afin d'insérer une carte dans l'onglet, nous avons utilisé la librairie `Leaflet`. Afin de pouvoir visualiser une carte, nous avons mis un conteneur `div` nommé `mapContainer` pour que la librairie Leaflet puisse insérer la carte à notre page web. Pour créer la carte, nous avons fait `L.map("mapContainer")`.

Pour la deuxième tâche, nous avons choisi une liste déroulante (style "combo box") afin d'y placer l'option de choisir le moment pour lequel l'utilisateur veut afficher les prévisions. La méthode statique `MapDataParser.parse(...)` se charge d'interpréter et de séparer l'information retournée par la route `/station/forecast`. Ainsi, nous sommes en mesure de populer une liste de moments pouvant être sélectionnés à partir des prévisions fournies par le serveur.  

Pour la troisième tâche, les villes affichées sur la carte correspondent aux stations météorologiques contenues dans le fichier `station_mapping.json`, situé sur le serveur. ==Afin d'obtenir une liste contenant les informations pertinentes des stations à afficher, nous avons ajouté une route `/station/map-info` sur le serveur **(À FAIRE)**==. Celle-ci retourne un tableau d'objets contenant le nom de la station, un de ses identifiants contenu dans le fichier `station_mapping.json`, la latitude ainsi que la longitude qui se retrouvent tous deux dans le fichier `Station Inventory EN.csv`. Pour ce qui est de la température affichée, cette information provient de la route `/station/forecast`. Comme mentionné pour la deuxième tâche, la méthode `MapDataParser.parse(...)` se charge d'interpréter et de séparer l'information provenant de la route afin de pouvoir l'utiliser sur la carte. Pour les prévisions d'une station donnée, la méthode retourne un tableau d'objets contenant le texte affiché pour la liste déroulante (`displayed`), le jour (`day`), le moment de la journée (`moment`), la température (`temperature`) et les détails (`details`). 

Pour afficher les stations, nous avons utilisé `L.marker([this.stations[i].lat, this.stations[i].lon])` où `.lat` est la latitude et `.lon` est la longitude. Pour y afficher la température, nous ajoutons du texte à la punaise en faisant `.bindTooltip(temperature, { permanent: true, direction: "center", className: className })` sur une punaise. Le paramètre `className` est déterminé par la valeur de la donnée `moment`: si la prévision est de soir ou de nuit, `moment` sera égal à `nuit` et le paramètre sera égal à `markerLabelNight` qui est la classe CSS correspondant à du texte blanc sur fond noir, alors que si la prévision est de jour, `moment` sera égal à `markerLabelDay` qui correspond à du texte noir sur fond jaune. Les classes CSS `markerLabelNight` et `markerLabelDay` sont situées dans le fichier `map.css`.

Pour la quatrième tâche, nous avons affiché les infobulles en faisant `.bindPopup(textePrévision)` sur une punaise où `textePrévision` est le texte représentant la prévision détaillée. Ce texte ce retrouve dans le tableau des prévisions pour les 6 prochains jours et varie selon la journée et la station sélectionnée. 

Finalement, pour la cinquième tâche, on peut utiliser `.setView(position, zoom)` pour centrer la carte sur un point. Dans notre cas, nous avons utilisé `.setView([54.54, -95.14], 2)` pour centrer la carte sur l'ensemble du Canada. Un bouton a été ajouté sur l'interface pour recentrer la carte à volonté.

#### Embûches recontrées et solutions

##### 1. Objet retourné par la route /station/forecast

Nous avons eu des problèmes avec l'objet retourné par la route `/station/forecast` : dans le livrable précédent, il n'était pas important que le format retourné soit consistant étant donné qu'il n'y avait pas d'extraction de données à faire. À titre contextuel, voici le format que pouvait avoir une réponse pour les prévisions: 

```
[
	0: "Hamilton - Météo - Environnement Canada", 
	1: "https://meteo.gc.ca/...",
	2: "2024-08-01T...",
	3: "AVERTISSEMENT DE CHALEUR, Hamilton",
	4: "AVERTISSEMENT DE PLUIE TERMINÉ, Hamilton", 
		// L'alerte ci-dessus est problématique 
		// puisque cet index serait normalement 
		// réservé aux conditions actuelles.
	5: Array(13) [...] 
		// Les conditions actuelles se retrouveraient 
		// dans ce sous-tableau. Remarque, 
		// pour 6 jours et nuits, nous aurions
		// 12 éléments, et non 13.
]
```

Ainsi, nous avons modifié l'objet retourné par la route des prévisions afin que les alertes soient dans un sous-tableau au cas où il y en aurait plusieurs. De cette façon, les alertes n'interfèrent pas avec les conditions actuelles. Voici le nouveau format: 

```
[
	0: "Hamilton - Météo - Environnement Canada", 
	1: "https://meteo.gc.ca/...",
	2: "2024-08-01T...",
	3: Array(2) [
		0: "AVERTISSEMENT DE CHALEUR, Hamilton",
		1: "AVERTISSEMENT DE PLUIE TERMINÉ, Hamilton"
	], 
	4: "Conditions actuelles: Généralement nuageux, 26 C",
	5: Array(12) [...] 
]
```

##### 2. Décalage des prévisions pour les stations de l'ouest canadien

##### 3. La carte ne se recentre pas 
Pour des raisons encore inconnues, la carte de Leaflet ne se recentre pas lorsqu'on ouvre l'onglet "carte". De plus, dans cet état, cliquer sur une punaise ne fait que nous recentrer à la position [0, 0]. Nous avons fait des recherches sur internet mais nous n'avons pas trouvé quoique ce soit qui parle de notre problème. 

Nous avons découvert que la carte se comportait normalement si on redimensionnait le navigateur. Nous avions entendu parler que mettre la carte plus grosse pourrait régler le problème, mais cette piste de solution n'a pas réglé le problème. 

## Cache
<!--R5: Comment procédez-vous pour retirer ou mettre à jour de manière périodique les entrées périmées du cache sur le back-end? (4 points)-->
#### Retrait et mise-à-jour des données périmées

## Conclusion
<!-- R7: Notez qu'une brève introduction et conclusion sont également demandées. (4 points) -->
