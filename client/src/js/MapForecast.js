import L from "leaflet"

export default {
	name: "MapForecast",

	data() {
		return {
			map: null,
		}
	},

	mounted() {
		this.map = L.map('mapContainer').setView([54.545187, -95.147861], 2);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(this.map);
	},

	methods: {

	}
}