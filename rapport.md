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

#### Embûches recontrées et solutions

## Cache
<!--R5: Comment procédez-vous pour retirer ou mettre à jour de manière périodique les entrées périmées du cache sur le back-end? (4 points)-->
#### Retrait et mise-à-jour des données périmées

## Conclusion
<!-- R7: Notez qu'une brève introduction et conclusion sont également demandées. (4 points) -->
