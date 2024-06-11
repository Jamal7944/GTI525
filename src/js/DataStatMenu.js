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

      loadDatapicker(){
        
        const elem = document.getElementById('InputDatepick');
        this.datepicker = new DateRangePicker(elem, {
          buttonClass: 'btn',
          defaultViewDate: this.getToday(),
          pickLevel: 1,
          format: "m/yyyy"
        });
        this.datepicker.inputs[0].value = this.getToday();
        this.datepicker.inputs[1].value = this.getToday();
      },

      selectDonneesOnClick() {
        this.loadStationData();
      },
  
      toutesDonneesOnClick() {
        this.datepicker.inputs[0].value = "1/1990"
        this.datepicker.inputs[1].value = this.getToday();
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
        const rangepicker = document.getElementById('InputDatepick').rangepicker;
        let anneeDebutDD = Number.parseInt(rangepicker.inputs[0].value.split("/")[1]);
        let moisDebutDD = Number.parseInt(rangepicker.inputs[0].value.split("/")[0]);
        let anneeFinDD = Number.parseInt(rangepicker.inputs[1].value.split("/")[1]);
        let moisFinDD = Number.parseInt(rangepicker.inputs[1].value.split("/")[0]);
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
          context.loadDatapicker();
  
          let stationID = Number.parseInt(Station.stationInventory[0]["Station ID"]);
            Station.loadStationMetrics(stationID, context, (context) => {
              context.loadStationData();
            });
        });
      },
    },
  };