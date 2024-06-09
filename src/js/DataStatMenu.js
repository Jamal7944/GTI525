import { Station } from './Stations/Station';
import {DateUtils} from './Utils/Date';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { TableUtils } from './Utils/Table';

export default {
    name: "DataStatMenu",
    data() {
      return {
        years: [],
        monthNames: [], 
        T4_1_vueDonnees_HTML: "",
        T5_1_statsGlob_HTML: "",
      };
    },
  
    mounted() {
      this.load();
    },
  
    methods: {
      plageDatesOnChange() {
        this.loadStationData();
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

        this.loadStationData();
      },
  
      stationSelectorChange(id) {
        let stationID = Number.parseInt(id);
        Station.loadStationMetrics(stationID, this, (context) => {
          context.loadStationData();
        });
      },
  
      loadDates() {
        this.years = DateUtils.getYears(1900, 2050);
        this.monthNames = DateUtils.getMonths();
      }, 
  
      loadStationData() {
        let anneeDebutDD = Number.parseInt(document.getElementById("anneeDebut").value);
        let moisDebutDD = Number.parseInt(document.getElementById("moisDebut").selectedIndex + 1);
        let anneeFinDD = Number.parseInt(document.getElementById("anneeFin").value);
        let moisFinDD = Number.parseInt(document.getElementById("moisFin").selectedIndex + 1);
        let fromDate = DateUtils.getFormatedDate(anneeDebutDD, moisDebutDD);
        let toDate = DateUtils.getFormatedDate(anneeFinDD, moisFinDD);
  
        let metricsHeaders = Station.getMetricsViewHeader();
        let metricsView = Station.selectMetricsView(fromDate, toDate);
        let metricsHtml = TableUtils.generateHTML(metricsHeaders, metricsView);
        this.T4_1_vueDonnees_HTML = metricsHtml;

        let globalStatsHeaders = Station.getGlobalStatisticsHeader();
        let globalStats = Station.getGlobalStatistics(fromDate, toDate);
        let globalStatsHtml = TableUtils.generateHTML(globalStatsHeaders, globalStats);
        this.T5_1_statsGlob_HTML = globalStatsHtml;
      },

      load() {
        Station.loadStationInventory(this, (context) => {
          context.loadDates();
  
          let stationID = Number.parseInt(Station.stationInventory[0]["Station ID"]);
            Station.loadStationMetrics(stationID, context, (context) => {
              context.loadStationData();
            });
        });
      },
    },
  };