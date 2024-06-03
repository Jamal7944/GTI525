
//import { vueDonnees } from './vueDonnees';
import { StationData } from './Stations/stationData';
import { StationSnapshotView } from './Stations/stationSnapshotView';
import { StationRegistery } from './Stations/stationRegistery';


export default {
  name: "App",
  data() {
    return {
      csvData: [], 
      stationDataHeader: [], 
      stationData: [],
      stationGlobalStats: [],
      stationMontlyStats: [],
      stationIds: [],
      years: [],
      monthNames: [], 
      stationRegistery: new StationRegistery(),
    };
  },

  mounted() {
    this.loadCSV();
    this.loadYears();
    this.monthNames = StationData.getMonths();
    this.stationDataHeader = StationSnapshotView.getHeaders();
  },

  methods: {
    loadYears() {
      this.years = [];
      for(let i = 1900; i < 2050; i++) {
        this.years.push(i);
      }
    },

    plageDatesOnChange() {
      this.stats = [];
      let anneeDebutDD = Number.parseInt(document.getElementById("anneeDebut").value);
      let moisDebutDD = Number.parseInt(document.getElementById("moisDebut").selectedIndex + 1);
      let anneeFinDD = Number.parseInt(document.getElementById("anneeFin").value);
      let moisFinDD = Number.parseInt(document.getElementById("moisFin").selectedIndex + 1);

      if(this.stationRegistery.hasValidSelectedStationData()) {
        this.stationData = this.stationRegistery.getSelectedStationData().getDataInTimeFrame(anneeDebutDD, moisDebutDD, anneeFinDD, moisFinDD);
        console.log("Station data: " + this.stationData);
      }
    },

    toutesDonneesOnClick() {
      let anneeDebutDD = document.getElementById("anneeFin");
      let moisDebutDD = document.getElementById("moisFin");
      let anneeFinDD = document.getElementById("anneeFin");
      let moisFinDD = document.getElementById("moisFin");
      anneeDebutDD.options[0].selected = true;
      moisDebutDD.options[0].selected = true;
      anneeFinDD.options[anneeFinDD.options.length - 1].selected = true;
      moisFinDD.options[moisFinDD.options.length - 1].selected = true;
      this.plageDatesOnChange();
    },

    stationSelectorChange() {
      let stationSelectorDD = document.getElementById("stationSelecteur");
      this.stationRegistery.loadStationData(stationSelectorDD.value);
      this.plageDatesOnChange();
    },

    async loadCSV() {
      await this.stationRegistery.loadStationInventory("Station Inventory EN");
      this.stationIds = this.stationRegistery.getListOfStationID();
      this.toutesDonneesOnClick();
    },
  },
};