import Papa from 'papaparse'; // Importez Papaparse
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavigationMenu from '@/components/NavigationMenu.vue'; // Assurez-vous de spécifier le bon chemin

export default {
  components: {
    NavigationMenu 
  },
  name: "App",
  data() {
    return {
      csvData: [],
      greetingMsg : "Bonjour ! ",
      greetingSubMsg : "GTI525 - Groupe",
      footerValue :"Hello",
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
