import Papa from 'papaparse'; // Importez Papaparse
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
  name: "NavigationMenu",
  data() {
    return {
      ListeStations:[]
    };
  },
  mounted() {
    this.loadStations()
  },
  methods: {
    async loadStations(){
      try {
         
        const response = await fetch("/Laboratoire_1_-_Enonces-20240516/Lab1_CSV/Station Inventory EN.csv");
        const csvText = await response.text();
        this.ListeStations = Papa.parse(this.removeFirstLines(csvText,3), { header: true }).data;
        this.ListeStations = this.ListeStations.filter((item, i, ar) => {
                    return ar.findIndex(obj => obj.Province === item.Province) === i;
      });
      
        console.log(this.ListeStations)
      } catch (error) {
        console.error("Erreur lors du chargement du fichier CSV :", error);
      }
    },
    removeFirstLines(text, numberOfLinesToRemove) {
      const lines = text.split('\n');
      const remainingLines = lines.slice(numberOfLinesToRemove).join('\n');
      return remainingLines;
    }

  },
};
