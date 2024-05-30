import Papa from 'papaparse'; // Importez Papaparse
import { StationData } from './stationData';

export default {
  name: "App",
  data() {
    return {
      csvData: [],
      stnData: [],
      stats: [],
      years: [],
      monthName: ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre",
        "Octobre", "Novembre", "Decembre"], 
    };
  },

  mounted() {
    this.loadCSV();
    this.loadYears();
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
      let anneeDebutDD = document.getElementById("anneeFin");
      let moisDebutDD = document.getElementById("moisFin");
      let anneeFinDD = document.getElementById("anneeFin");
      let moisFinDD = document.getElementById("moisFin");

      for(let i = 1; i < this.stnData.length; i++) {
        let condition = 
          this.stnData[i].year >= anneeDebutDD.value &&
          this.stnData[i].month >= moisDebutDD.value &&
          this.stnData[i].year <= anneeFinDD.value &&
          this.stnData[i].month <= moisFinDD.value;

        if(condition) {
          this.stats.push(this.stnData[i]);
        }
      }

      for(let v in this.stats) {
        console.log(v);
      }
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

    async loadCSV() {
      try {
        const response = await fetch("/Laboratoire_1_-_Enonces-20240516/Lab1_CSV/118.csv");
        const csvText = await response.text();
        this.csvData = Papa.parse(csvText, { header: true }).data;
      } catch (error) {
        console.error("Erreur lors du chargement du fichier CSV :", error);
      }

      // converti les données parsées en Objets (StationData);
      this.stnData = [];
      this.csvData.forEach((i) => {
        let fieldArray = [];
        for(let k in i) {
          fieldArray.push(i[k]);
        }

        console.log("Iteration: "+fieldArray[5]);

        console.log(fieldArray);
        if(fieldArray.length != 29) {
          console.log(fieldArray);
        }
        else {
          let data = new StationData(fieldArray);
          this.stnData.push(data);
          //console.log("data: "+data);
        }
      });
    },
  },
};