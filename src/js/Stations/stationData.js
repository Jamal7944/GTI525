import { StationSnapshot } from "./stationSnapshot";
import { StationSnapshotView } from "./stationSnapshotView";

export class StationData {
    snapshots = [];

    constructor() {
        // empty
    }

    addSnapshot(snapshot) {
        if(!(snapshot instanceof StationSnapshot)) {
            throw new Error("snapshot was not instance of StationSnapshot.");
        }

        this.snapshots.push(snapshot);
    }

    getSnapshots(fromYear, fromMonth, toYear, toMonth) {
        if(typeof fromYear != "number" || typeof fromMonth != "number" || typeof toYear != "number" || typeof toMonth != "number") {
            throw new Error("parameters were of the wrong type!");
        }

        let selectedSnaps = [];
        for(let i = 0; i < this.snapshots.length; i++) {
            let yearMonth = this.snapshots[i].year * 100 + this.snapshots[i].month;
            let fromYearMonth = fromYear * 100 + fromMonth; 
            let toYearMonth = toYear * 100 + toMonth;

            if(yearMonth >= fromYearMonth && yearMonth <= toYearMonth) {
                selectedSnaps.push(this.snapshots[i]);
            }
        }

        return selectedSnaps;
    }

    /** 
     * T4.1 - Vue des données: Afficher certaines données pour une période donnée. 
     * @param fromYear Année de début de la période sélectionnée.
     * @param fromMonth Mois de l'année de début.
     * @param toYear Année de fin de la période sélectionnée.
     * @param toMonth Mois de l'année de fin.
     */ 
    getDataInTimeFrame(fromYear, fromMonth, toYear, toMonth) {
        let selectedSnaps = this.getSnapshots(fromYear, fromMonth, toYear, toMonth);
        let processedView = [];
        for(let i = 0; i < selectedSnaps.length; i++) {
            let viewArr = [
                selectedSnaps[i].year,
                selectedSnaps[i].month,
                selectedSnaps[i].meanMaxTempCelcius,
                selectedSnaps[i].meanMinTempCelcius,
                (selectedSnaps[i].meanMaxTempCelcius + selectedSnaps[i].meanMinTempCelcius) / 2,
                selectedSnaps[i].extrMaxTempCelcius,
                selectedSnaps[i].extrMinTempCelcius,
                selectedSnaps[i].totalRainMillimeters,
                selectedSnaps[i].totalSnowCentimeters,
                selectedSnaps[i].spdOfMaxGustKmh,
            ];
            
            processedView.push(new StationSnapshotView(viewArr));
        }

        return processedView;
    }

    /*
    getGlobalMaxMeanTemp(selectedSnaps) {

    }

    getGlobalDataStats(fromYear, fromMonth, toYear, toMonth) {
        let selectedSnaps = this.getSnapshots(fromYear, fromMonth, toYear, toMonth);
        
    }

    */

    static getMonths() {
        return [
            "Janvier", 
            "Fevrier", 
            "Mars", 
            "Avril", 
            "Mai", 
            "Juin", 
            "Juillet", 
            "Aout", 
            "Septembre", 
            "Octobre", 
            "Novembre", 
            "Decembre"
        ];
    }
}