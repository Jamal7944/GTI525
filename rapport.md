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
Dans le livrable précédent, nous avons eu à implémenter un début d'application dorsale ainsi que deux nouvelles fonctionnalitées, soit les prévisions passées et les prévisions pour les prochains jours. Pour ce livrable, nous avons amélioré la partie dorsale de notre application et nous avons ajouté une fonctionnalité. Il a fallu compléter notre implémentation de l'application dorsale afin de créer une API RESTful, importer les données météo moyennes dans MongoDB, construire une cache structurée aux requêtes API et finalement ajouter une carte afin de visualiser la température actuelle et les prévisions futures. Nous allon srevenir sur les différentes tâches effectuées en abordant le travail réalisé, les difficultés rencontrées et les solutions mises en place. 

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
### Choix de conception et limitations
Pour la base de donnée, afin de facilité le deployement par le chargé de projet, nous avons decider d'utiliser `docker compose` ainsi que 2 containers. Le premiere provenant directement de la compagnie en charge de MongoDB et qui créer un instance de la base de donnée de type communautaire et accessible à l'adresse `127.0.0.1:27017`. Le second container consiste a un script python qui permet de peuplé la base de donnée si celle-ci est vide (la validation consiste a voir si la collection `meteo` est vide et/ou existe).

Ce choix de conception permet une un deploiement facile et une mise à l'echelle horizontale (_horizontal scaling_), elle rend notre base de donnée dépendante de l'environnement Docker. Ainsi, elle empeche aussi de _debugger_ facilement le code du a sont execution ce fesant dans un _container_.

### Les collections et la structure des documents
Pour les collections, nous avons utilisées 1 collection par objet a sauvegardé soit : 
- **stations** : les differentes stations
- **historique** : l'historique de la meteo selon les differentes stations
- **forecast** : les prévision météo
- **forecastHourly** : les previsions météo (par heures)

les informations entre les stations et l'historique peuvent etre rejoint avec la ligne `climate_id` ou `station_id` (`_id` dans MongoDB)


## Architecture logicielle
<!--R3: Décrivez les modifications apportées à l'architecture logicielle de votre back-end et de votre front-end par rapport au livrable précédent (total 10 points)-->
#### Diagramme de classe et patrons de conception

## Classes de l'application frontale

![ClassDiagramClient](/ClientDiagram.png)

## Classes de l'application dorsale
![ClassDiagramServer](/Server.png)

## Patron Singleton de conception	
Que ce soit au niveau du client ou du server, on peut observer que plusieurs classes utilisent implicitement le patron Singleton par l'usage de méthodes statiques. Le patron Singleton garantit qu'une classe a une seule instance tout en fournissant un accès global à cette instance. 
Les classes DateUtils, Assert, MapDataParser, ParagraphUtils, ObjParser, et TableUtils utilisent des méthodes statiques pour offrir des fonctionnalités globales auxquelles nous pouvons accéder en tout lieu dans le projet. Etant donné qu'on ne créer pas d'instance de ces classes, elles fonctionnent ainsi comme un singleton.



#### Organisation et rôles des classes et fonctions

Depuis le second laboratoire nous avons instauré une architecture qui permettait de séparer clairement le code applicatif frontal (côté client) du code dorsal (côté serveur). L'architecture est restée similaire puisque nous conservons cette séparation claire entre les deux composants majeurs de notre application. 

Cependant nous avons ajouté un dossier dédié au chargement des fichiers sources CSV du premier laboratoire ainsi qu'un fichier script dockerfile chargé d'executer le code python. Pour cette troisième itération nous avons en effet mis en place de la conteneurisation avec Docker pour faciliter l'initialisation de la base de données MongoDB ainsi que la population de la base de donnée avec les fichier CSV. Le but de Docker était d'ajouter aussi le client et le serveur pour facilité le deploiement total, mais malheureusement, l'application doit etre déployé manuellement car nous n'avons pas reussi a bien exclure les erreures `CORS` (du au fait que le client et le serveur doivent etre executé dans 2 _containers_ différents).

#### Choix de conception et limitations

Nous avons considéré un fichier *routes.js* au niveau du serveur backend chargé de définir toutes les routes d'Express que le client va utiliser. C'est donc ce fichier qui est utilisé par Express à l'initialisation de ce dernier. De cette façon nous avons centralisé les appels API du client vers le serveur. Nous allons maintenant aborder les différents verbes et noms des ressoruces que nous utilisons ou consommons à travers les appels des APIs externes.
Pour récupérer les informations météo de la carte des stations on utilise le verbe *get* avec le nom racine `/station/` pour ensuite spécifier la route avec `/map-info`. L'utilisation du *get* est justifiée par le fait que nous voulons simplement récupérer la collection de données utilisées pour charger la carte. La route `/station/past-hourly-forecast` est utilisée pour permettre au client de récupérer les prévisions horaires historiques pour une station donnée. Le *post* est utilisé ici car nous envoyons des informations spécifiques (stationID, année, mois, jour) dans le corps de la requête afin de recevoir les données demandées. La réponse contient les données horaires pour la journée spécifiée ainsi que les en-têtes de données associées. Si l'ID de station fourni n'est pas valide, la réponse renverra une erreur 404 avec un message approprié. La route `/station/forecast` est utilisée pour permettre au client de récupérer les prévisions météorologiques à venir pour une station donnée. Le *post* est employé ici car les prévisions sont demandées en fonction de l'ID de station fourni dans le corps de la requête. La réponse inclut les prévisions pour la station spécifiée ainsi qu'un lien vers la ressource elle-même pour référence. Si l'ID de station est manquant ou invalide, la réponse renverra une erreur 400 avec un message de demande incorrecte.

Nous avons décider de toujours formater les ressources obtenues via les APIs externes sous le format JSON afin de standardiser le traitement des objets passés du serveur au client. 

Comme nous le verrons un peu plus tard, nous avons rencontré certains problème sur le format des ressources renvoyées par les APIs externes. Une des limites de notre conception dans l'API REST est justement la gestion de l'over-fetching ou de l'under-fetching. En effet, selon les conditions météos actuellement disponnibles, la quantitité de ressources consommées ou le formats des objets retournés, cela peut nous demander à revoir notre traitement des données et donc faillir à la scalabilité de l'application. 



## Carte météo
<!--R4: Décrivez de quelle manière vous avez implémenté les tâches reliées à la carte des données météo, plus particulièrement T4.3 et T4.4. Quelles problématiques avez-vous rencontré, et comment les avez-vous résolues? (8 points)-->
#### Implémentation 
Pour la première tâche, un onglet nommé "Carte" contenant la carte ainsi que les fonctionnalités qui y sont rattachés a été ajouté. Afin d'insérer une carte dans l'onglet, nous avons utilisé la librairie `Leaflet`. Afin de pouvoir visualiser une carte, nous avons mis un conteneur `div` nommé `mapContainer` pour que la librairie Leaflet puisse insérer la carte à notre page web. Pour créer la carte, nous avons fait `L.map("mapContainer")`.

Pour la deuxième tâche, nous avons choisi une liste déroulante (style "combo box") afin d'y placer l'option de choisir le moment pour lequel l'utilisateur veut afficher les prévisions. La méthode statique `MapDataParser.parse(...)` se charge d'interpréter et de séparer l'information retournée par la route `/station/forecast`. Ainsi, nous sommes en mesure de populer une liste de moments pouvant être sélectionnés à partir des prévisions fournies par le serveur.  

Pour la troisième tâche, les villes affichées sur la carte correspondent aux stations météorologiques contenues dans le fichier `station_mapping.json`, situé sur le serveur. Afin d'obtenir une liste contenant les informations pertinentes des stations à afficher, nous avons ajouté une route `/station/map-info` sur le serveur. Celle-ci retourne un tableau d'objets contenant le nom de la station, un de ses identifiants contenu dans le fichier `station_mapping.json`, la latitude ainsi que la longitude qui se retrouvent tous deux dans le fichier `Station Inventory EN.csv`. Pour ce qui est de la température affichée, cette information provient de la route `/station/forecast`. Comme mentionné pour la deuxième tâche, la méthode `MapDataParser.parse(...)` se charge d'interpréter et de séparer l'information provenant de la route afin de pouvoir l'utiliser sur la carte. Pour les prévisions d'une station donnée, la méthode retourne un tableau d'objets contenant le texte affiché pour la liste déroulante (`displayed`), le jour (`day`), le moment de la journée (`moment`), la température (`temperature`) et les détails (`details`). 

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
Le Canada étant un vaste pays, les provinces ne sont pas toutes sur le même fuseau horaire. Étant donné que nous sommes situés dans l'est canadien, notre fuseau est différent de celui de l'ouest. Dans les données fournies par Environnement Canada, si la station est en avant-midi, elle aura une prévision additionnelle (13 prévisions) pour la journée d'aujourd'hui. Si la station est en après-midi, alors cette prévision additionnelle n'est pas présente et nous avons 12 prévisions. Cette situation causait un décalage dans les jours sélectionnés où on pouvait avoir pour demain soir et nuit les températures de jours pour les stations de l'ouest et les température de nuit pour les stations à l'est. 

Afin de remédier à ce problème, il a fallu détecter la journée qui était réglée sur l'ordinateur client et avec cette information vérifier si la première entrée des prévisions d'une station correspondait à cette journée. Si oui, cette prévision est simplement ignorée.

##### 3. La carte ne se recentre pas 
Pour des raisons encore inconnues, la carte de Leaflet ne se recentre pas lorsqu'on ouvre l'onglet "carte". De plus, dans cet état, cliquer sur une punaise ne fait que nous recentrer à la position [0, 0]. Nous avons fait des recherches sur internet mais nous n'avons pas trouvé quoique ce soit qui parle de notre problème. 

Nous avons découvert que la carte se comportait normalement si on redimensionnait le navigateur. Nous avions entendu parler que mettre la carte plus grosse pourrait régler le problème, mais cette piste de solution n'a pas réglé le problème. 

## Cache
<!--R5: Comment procédez-vous pour retirer ou mettre à jour de manière périodique les entrées périmées du cache sur le back-end? (4 points)-->
#### Pour la connexion :
Pour commencer, on se connecte sur la base de données pour aller chercher la collection de cache pour la prévision. Ensuite, on va créer un index à la collection qui expire dans 300 secondes (5minutes) pour la prévision et un autre à 3600 secondes (1 heure) pour les prévisions antérieures.
#### Pour prévision :
On retourne sur le fichier .js qui va chercher et traiter le fichier .xml reçu d’Environnement Canada. Avant de faire la requête au site d’Environnement Canada, on va se connecter à la base de données pour vérifier si une collection de cache existe. Si oui on retourne un message à la console et on retourne la valeur obtenue. Si non, la connexion reste ouverte et on fait la demande au serveur pour le fichier .xml pour le traiter. Après d’avoir traité les données, on va insérer les valeurs traitées dans un tableau et on va insérer celui-ci dans la base de données avec le numéro de la station comme identifiant. 

##### Voici un apperçue de la valeur sur MongoDB Compass:

![image](https://github.com/user-attachments/assets/00e05faf-1c57-476a-ad6a-131579bf60a7)

#### Pour les prévisions antérieures :
On retourne sur le fichier .js qui va chercher et traiter le fichier .csv reçu d’Environnement Canada. Avant de faire la requête au site d’Environnement Canada, on va se connecter à la base de données pour vérifier si un cache existe. Si oui on retourne un message à la console et on retourne la valeur obtenue. Si non, la connexion reste ouverte et on fait la demande au serveur pour le fichier .csv. Ensuite, on va insérer les valeurs du fichier .csv directement dans la base de données avec le numéro de station comme identifiant.

##### Voici un apperçue de la valeur sur MongoDB Compass:

![image](https://github.com/user-attachments/assets/66397619-67d5-4256-b0ea-a33e7a935365)


## Conclusion
<!-- R7: Notez qu'une brève introduction et conclusion sont également demandées. (4 points) -->
Au cours de ce livrable, nous avons pu mettre en pratique les différents concepts vu en classe afin d'atteindre les objectifs de ce livrable. Notre API est "RESTful", nous avons importé les données météo dans la base de donnée MongoDB, nous avons une cache structurée pour les requêtes vers les services externes et nous avons ajouté une carte pour visualiser la température actuelle et les prévisions pour les prochains jours et nuits. De plus, nous avons aussi utilisé un docker pour automatiser initialisation du projet ainsi que de la base de donnée. 
