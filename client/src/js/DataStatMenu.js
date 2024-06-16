import { Station } from './Stations/Station';
import {DateUtils} from './Utils/Date';
import { TableUtils } from './Utils/Table';
import {DateRangePicker } from 'vanillajs-datepicker';
import 'vanillajs-datepicker/css/datepicker-bs5.css';

export default {
    name: "DataStatMenu",
    data() {
      return {
        years: [],
        monthNames: [], 
        T4_1_vueDonnees_HTML: "",
        T5_1_statsGlob_HTML: "",
        T5_2_statsMensuel: "",
        datepicker:DateRangePicker
      };
    },
  
    mounted() {
      this.load();
    },
  
    methods: {
      plageDatesOnChange() {
        this.loadStationData();
      },

      getToday(){
        const today = new Date();
        const temp = today.toLocaleDateString('en-us').split("/");
        return temp[0] + "/" + temp[2]
      },

      // loadDatapicker(){
        
      //   const elem = document.getElementById('InputDatepick');
      //   this.datepicker = new DateRangePicker(elem, {
      //     buttonClass: 'btn',
      //     defaultViewDate: this.getToday(),
      //     pickLevel: 1,
      //     format: "m/yyyy"
      //   });
      //   this.datepicker.inputs[0].value = this.getToday();
      //   this.datepicker.inputs[1].value = this.getToday();
      // },

      selectDonneesOnClick() {
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
        let metricsHtml = "";
        if(metricsView.length == 0) {
          metricsHtml = TableUtils.generateNotAvailable();
        }
        else {
          metricsHtml = TableUtils.generateHTML(metricsHeaders, metricsView);
        } 
        this.T4_1_vueDonnees_HTML = metricsHtml;

        let globalStatsHeaders = Station.getGlobalStatisticsHeader();
        let globalStats = Station.getGlobalStatistics(fromDate, toDate);
        let globalStatsHtml = "";
        globalStatsHtml = TableUtils.generateHTMLWithTitle("Statistiques globales", globalStatsHeaders, globalStats);
        this.T5_1_statsGlob_HTML = globalStatsHtml;
 
        let monthlyStatsHeaders = Station.getMonthlyStatisticsHeader();
        let monthlyStats = Station.getMonthlyStatistics(fromDate, toDate);
        let months = DateUtils.getMonths();
        let totalMonthlyHTML = "";
        for(let i = 0; i < DateUtils.monthNumer; i++) {
          totalMonthlyHTML += TableUtils.generateHTMLWithTitle(months[i], monthlyStatsHeaders, monthlyStats[i]);
        }
        this.T5_2_statsMensuel = totalMonthlyHTML;
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