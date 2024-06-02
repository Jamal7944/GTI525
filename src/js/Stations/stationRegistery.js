import Papa from 'papaparse'; // Importez Papaparse
import { StationInfo } from './stationInfo';
import { StationData } from './stationData';
import { StationSnapshot } from './stationSnapshot';

export class StationRegistery {
    stationMap = new Map(); 
    selectedStationId;
    selectedStationData;

    constructor() {
        // empty
    }

    /**
     * Charge en mémoire et construit les objets contenant les instantanés d'une station météo.
     * @param {string} stationID ID de la station météo désirée. 
     */
    async loadStationData(stationID) {
        let csvData = [];

        try {
            const response = await fetch("/Laboratoire_1_-_Enonces-20240516/Lab1_CSV/" + stationID + ".csv");
            const csvText = await response.text();
            csvData = Papa.parse(csvText, { header: true }).data;
        } catch (error) {
            console.error("Erreur lors du chargement du fichier CSV :", error);
        }

        try {
            let stationData = new StationData();
            csvData.forEach((i) => {
                let fieldArray = [];
                for(let k in i) {
                    fieldArray.push(i[k]);
                }
                
                if(fieldArray.length == 29) {
                    let stationSnapshot = new StationSnapshot(fieldArray);
                    stationData.addSnapshot(stationSnapshot);
                }
            });

            this.selectedStationData = stationData 
        }
        catch(ex) {
            console.log(ex); // normalement, si le code throw une exception, c'est qu'il ne trouve pas le fichier de la station.
        }
    }

    /**
     * Charges en mémoire et construit la hiérarchie d'objet représentant les stations météo.
     * @param {string} filename Nom du fichier .csv contenant la liste des stations météo ainsi que leur ID de station.
     */
    async loadStationInventory(filename) {
        let csvData = [];
        try {
            const response = await fetch("/Laboratoire_1_-_Enonces-20240516/Lab1_CSV/" + filename + ".csv");
            const csvText = await response.text();
            csvData = Papa.parse(csvText, { header: true }).data;
        } catch (error) {
            console.error("Erreur lors du chargement du fichier CSV :", error);
        }

        /*
         * FIX.
         * Il y a un problème avec le CSV où le parseur assume que la date de modification 
         * de l'inventaire des stations c'est la clée du premier objet de chaque ligne. 
         * Le reste des données est mis dans une donnée membre "__parsed_extra" qui est un tableau. 
         */
        let rowCount = 0;
        csvData.forEach((row) => {
            let fieldArray = [];
            let firstKey;

            firstKey = Object.keys(row)[0];   // obtient la clée de la première valeur de l'objet (qui est la date de modification du csv)
            fieldArray.push(row[firstKey]);   // on doit push la première valeur avec la première clée qu'on a obtenu précédement
            if(Object.keys(row).length > 1) { // s'il n'y a qu'une seule paire clée-valeur, alors on saute cet itération.
                let secondKey = Object.keys(row)[1]; // on obtient la seconde clé, qui contient le reste de la rangée.
                let rowOfValues = row[secondKey];    

                for(let i = 0; i < rowOfValues.length; i++) {
                    fieldArray.push(rowOfValues[i]);
                }

                if(rowCount != 0) { // pour éviter que les headers soient inclu comme station.
                    let stationInfo = new StationInfo(fieldArray);
                    this.stationMap.set(stationInfo.stationID, stationInfo);
                }
                
                rowCount++
            }
        });

        // on sélectionne la première station par défaut.
        let firstStationKey = this.stationMap.keys().next();
        this.selectedStationId = firstStationKey.value;
        console.log(this.selectedStationId)
        this.loadStationData(this.selectedStationId);
    }

    getListOfStationID() {
        let ids = [];
        this.stationMap.forEach((v, k) => {
            ids.push(k);
        })
        console.log(ids);
        return ids;
    }

    getStationData() {
        return this.selectedStationData;
    }

    getStationDataFromName(name) {
        let id = this.stationMap.get(name).stationID;
        return this.stationData.get(id);
    }
}