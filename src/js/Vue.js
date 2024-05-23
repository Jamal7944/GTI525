import Papa from 'papaparse'; // Importez Papaparse

export default {
  name: "App",
  data() {
    return {
      csvData: [],
      minvalue :"Hello",
    };
  },
  mounted() {
    this.loadCSV();
  },
  methods: {
    async loadCSV() {
      try {
         
        const response = await fetch("/Laboratoire_1_-_Enonces-20240516/Lab1_CSV/118.csv");
        const csvText = await response.text();
        this.csvData = Papa.parse(csvText, { header: true }).data;
      } catch (error) {
        console.error("Erreur lors du chargement du fichier CSV :", error);
      }
    },
  },
};