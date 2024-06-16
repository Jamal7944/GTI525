import NavigationMenu from '@/components/NavigationMenu.vue'; 
import DataStatMenu from '@/components/DataStatMenu.vue';
import api from '../Services/ApiUtils';
import 'bootstrap'


export default {
  components: {
    NavigationMenu,
    DataStatMenu
  },
  name: "App",
  data() {
    return {
    };
  },

  mounted() {
    api.fetchDataGET(),
    api.fetchDataPOST()
  },

  methods: {
  }
};
