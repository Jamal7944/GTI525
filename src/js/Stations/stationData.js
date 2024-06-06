import { StationSnapshot } from "./stationSnapshot";
import { StationSnapshotView } from "./stationSnapshotView";

export class StationData {

    /** Liste des instantanés de la station. */
    snapshots = [];
    
    /**
     *  Ajoute un instantané (StationSnapshot). 
     */
    addSnapshot(snapshot) {
        if(!(snapshot instanceof StationSnapshot)) {
            throw new Error("snapshot was not instance of StationSnapshot.");
        }

        this.snapshots.push(snapshot);
    }

    /** 
     * Sélectionne les instantanés (StationSnapshot) selon la période sélectionnée. 
     */
    getSnapshots(fromYear, fromMonth, toYear, toMonth) {
        if(typeof fromYear != "number" || typeof fromMonth != "number" || typeof toYear != "number" || typeof toMonth != "number") {
            throw new Error("parameters were of the wrong type!");
        }

        let selectedSnaps = [];
        for(let i = 0; i < this.snapshots.length; i++) {
            let yearMonth = this.snapshots[i].year * 100 + this.snapshots[i].month;
            let fromYearMonth = fromYear * 100 + fromMonth;
            let toYearMonth = toYear * 100 + toMonth;

            console.log("1:" + yearMonth + "\n2:" + fromYearMonth + "\n3:" + toYearMonth);

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

        console.log(selectedSnaps.length)

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


    /** 
     * Obtient la liste des mois. 
     */
    
}