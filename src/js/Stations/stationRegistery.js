//import Papa from 'papaparse'; // Importez Papaparse
import { StationInfo } from './stationInfo';
import { StationData } from './stationData';
import { StationSnapshot } from './stationSnapshot';
import { CsvParser } from '../Parser/parser';

/**
 * Classe établissant un inventaire des stations. 
 */
export class StationRegistery {
    /** Inventaire de StationInfo; la clée est le ID de la station. */
    stationMap = new Map(); 

    /** Le ID de la station sélectionnée. */
    selectedStationId;

    /** L'instance StationData de la station sélectionnée. */
    selectedStationData;

    /**
     * Charge en mémoire et construit les objets contenant les instantanés d'une station météo.
     * @param {string} stationID ID de la station météo désirée. 
     */
    async loadStationData(stationID) {
        let snapshots = await CsvParser.loadAndParse("/Laboratoire_1_-_Enonces-20240516/Lab1_CSV/" + stationID + ".csv");
        
        this.selectedStationData = new StationData();
        for(let i = 1; i < snapshots.length; i++) {
            if(snapshots[i].length == 29) {
                let snapshot = new StationSnapshot(snapshots[i]);
                this.selectedStationData.addSnapshot(snapshot);
            }
        }

        this.selectedStationId = stationID;
    }

    /**
     * Charges en mémoire et construit la hiérarchie d'objet représentant les stations météo.
     * @param {string} filename Nom du fichier .csv contenant la liste des stations météo ainsi que leur ID de station.
     */
    async loadStationInventory(filename) {
        let data = await CsvParser.loadAndParse("/Laboratoire_1_-_Enonces-20240516/Lab1_CSV/" + filename + ".csv")
        for(let i = 3; i < data.length; i++) {
            let stationInfo = new StationInfo(data[i]);
            this.stationMap.set(stationInfo.stationID, stationInfo);
        }

        // on sélectionne la première station par défaut.
        let firstStationKey = this.stationMap.keys().next();
        this.loadStationData(firstStationKey);
    }

    /**
     * 
     * @returns Indique si la station sélectionnée a réussi à être chargée ou non.
     */
    hasValidSelectedStationData() {
        return this.selectedStationData != null;
    }

    /**
     * Obtient l'instance de StationData de la station sélectionnée. 
     */
    getSelectedStationData() {
        return this.selectedStationData;
    }

    /**
     * 
     * @returns Retourne la liste des identifiants de stations.
     */
    getListOfStationID() {
        let ids = [];
        this.stationMap.forEach((v, k) => {
            ids.push(k);
        })
        console.log(ids);
        return ids;
    }
}