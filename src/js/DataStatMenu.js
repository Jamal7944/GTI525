import { Station } from './Stations/Station';
import {DateUtils} from './Utils/Date';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
    name: "DataStatMenu",
    data() {
      return {
        years: [],
        monthNames: [], 
        T4_1_vueDonnees_HTML: "",
      };
    },
  
    mounted() {
      this.load();
    },
  
    methods: {
      plageDatesOnChange() {
        this.loadStationMetricsView();
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
  
      stationSelectorChange(id) {
        let stationID = Number.parseInt(id);
        //this.stationRegistery.loadStationData(stationSelectorDD.value);
        Station.loadStationMetrics(stationID);
        this.plageDatesOnChange();
      },
  
      loadDates() {
        this.years = DateUtils.getYears(1900, 2050);
        this.monthNames = DateUtils.getMonths();
      }, 
      
      async loadStationIds() {
        let idList = [];
        let attempts = 0;
        const maxAttempts = 10;
  
        while(idList.length == 0 && attempts < maxAttempts) {
          idList = Station.getStationIdList();
          await new Promise((r) => setTimeout(r, 200)); // ne posez pas de question, ça marche.
          attempts++;
        }
        this.stationIds = idList;
        console.log(this.stationIds);
      },
  
      async loadStationMetricsView() {
        let anneeDebutDD = Number.parseInt(document.getElementById("anneeDebut").value);
        let moisDebutDD = Number.parseInt(document.getElementById("moisDebut").selectedIndex + 1);
        let anneeFinDD = Number.parseInt(document.getElementById("anneeFin").value);
        let moisFinDD = Number.parseInt(document.getElementById("moisFin").selectedIndex + 1);
        let fromDate = Station.getFormatedDate(anneeDebutDD, moisDebutDD);
        let toDate = Station.getFormatedDate(anneeFinDD, moisFinDD);
        let metricsView = [];
        let attempts = 0;
        const maxAttempts = 10;
  
        let metricsHeaders = Station.getMetricsViewHeader();
  
        while(metricsView.length == 0 && attempts < maxAttempts) {
          metricsView = Station.selectMetricsView(fromDate, toDate);
          await new Promise((r) => setTimeout(r, 100)); // ne posez pas de question, ça marche.
          attempts++;
        }

        let html = Station.generateHTML(metricsHeaders, metricsView);
        this.T4_1_vueDonnees_HTML = html;
      },
  
      async load() {
        Station.loadStationInventory().then(() => {
          this.loadDates();
          this.loadStationIds();
  
          if(this.stationIds.length > 0) {
            let stationID = Number.parseInt(this.stationIds[0]);
            Station.loadStationMetrics(stationID);
            this.loadStationMetricsView();
          }
        })

        
        
        
      },
    },
  };