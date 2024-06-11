import Papa from 'papaparse'; // Importez Papaparse
import DataStatMenu from './DataStatMenu';

export default {
  name: "NavigationMenu",
  data() {
    return {
      ListeStations:[],
      ProvinceStations:[],
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

        this.ProvinceStations = {}; // Initialisation de ProvinceStations comme un objet vide

        this.ListeStations.forEach(station => {
            const province = station.Province;
            if (!this.ProvinceStations[province]) {
                this.ProvinceStations[province] = [];
            }
            this.ProvinceStations[province].push(station);
        });

    } catch (error) {
        console.error("Erreur lors du chargement du fichier CSV :", error);
      }
    },
    removeFirstLines(text, numberOfLinesToRemove) {
      const lines = text.split('\n');
      const remainingLines = lines.slice(numberOfLinesToRemove).join('\n');
      return remainingLines;
    },
    LoadDataStation(id){
      console.log(id);
      DataStatMenu.methods.stationSelectorChange(id)
      document.getElementById("station_displayed_id").innerHTML = this.ListeStations[id].Name
    },

  }

};
