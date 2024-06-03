
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
      this.stationData = this.stationRegistery.getStationData().getDataInTimeFrame(anneeDebutDD, moisDebutDD, anneeFinDD, moisFinDD);
      console.log("Station data: " + this.stationData);
    },

    toutesDonneesOnClick() {
      console.log("here");
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
      console.log(stationSelectorDD.value)
      this.stationRegistery.loadStationData(stationSelectorDD.value);
      this.plageDatesOnChange();

      console.log(this.stationData);
    },

    async loadCSV() {
      await this.stationRegistery.loadStationInventory("Station Inventory EN");
      this.stationIds = this.stationRegistery.getListOfStationID();
      this.toutesDonneesOnClick();

      /*
      try {
        const response = await fetch("/Laboratoire_1_-_Enonces-20240516/Lab1_CSV/118.csv");
        const csvText = await response.text();
        this.csvData = Papa.parse(csvText, { header: true }).data;
      } catch (error) {
        console.error("Erreur lors du chargement du fichier CSV :", error);
      }
      */

      // converti les données parsées en Objets (StationData);
      //this.stnData = [];

        /*
        this.csvData.forEach((i) => {
        let fieldArray = [];
        for(let k in i) {
            fieldArray.push(i[k]);
        }

        let year = fieldArray[5];
        let month = fieldArray[6];
        let temp_Mean_Max =fieldArray[7];
        let temp_Mean_Min= fieldArray[9];
        let temp_Mean= fieldArray[11];
        let temp_Max = fieldArray[13];
        let temp_Min = fieldArray[15];
        let rain= fieldArray[17];
        let snow= fieldArray[19];
        let wind_Speed_Max = fieldArray[27];
        */

       /* console.log("Year: "+year+", Month: "+month+", Mean Max: "+temp_Mean_Max+", Mean Min: "+temp_Mean_Min +", Temp Mean: "+temp_Mean+
        ", Temp Max: "+ temp_Max+", Temp Min: "+temp_Min+", Rain: "+rain+", Snow: "+snow+", Wind: "+wind_Speed_Max);*/
        //let arrayData = [year, month, temp_Mean_Max, temp_Mean_Min, temp_Mean, temp_Max, temp_Min, rain, snow, wind_Speed_Max];
        
        //console.log(arrayData);
        //console.log(fieldArray);

        /*
        if(fieldArray.length != 29) {
          console.log(fieldArray);
        }
        else {
          //let data = new StationData(fieldArray);
          let data = new vueDonnees(arrayData);
          this.stnData.push(data);
          //console.log("data: "+data);
        }
        
      });
      */
    },
  },
};