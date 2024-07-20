import L from "leaflet"
import { ObjParser } from "./Utils/Parser";

export default {
	name: "MapForecast",

	data() {
		return {
			map: null,
			stations: []

		}
	},

	mounted() {
		this.loadMap();
	},

	methods: {
		async loadStations() {
			// validIDs provient de 'station_mapping.json'
			const validIDs = [2205, 1865, 6633, 6207, 6358, 4932, 4789, 5415, 4337, 5251, 3002, 3328, 6720, 5097, 51357, 118, 3698];
			const filename = "./Laboratoire_1_-_Enonces-20240516/Lab1_CSV/Station Inventory EN.csv";
			const object = await ObjParser.csvToObj(filename, 2);

			for (let i = 0; i < object.length; i++) {
				let stnID = Number.parseInt(object[i]["Station ID"]);
				if (validIDs.includes(stnID)) {
					this.stations.push({
						name: object[i]["Name"],
						id: stnID,
						lat: object[i]["Latitude (Decimal Degrees)"],
						lon: object[i]["Longitude (Decimal Degrees)"]
					});
				}
			}
		},

		loadMap() {
			/*var icon = L.icon({
				iconUrl: './src/assets/marker.png',
				iconSize: [20, 20]
			});
			*/

			this.map = L.map('mapContainer').setView([54.545187, -95.147861], 2);
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(this.map);

			this.loadStations().then(() => {
				for(let i = 0; i < this.stations.length; i++) {
					L.marker([this.stations[i].lat, this.stations[i].lon])
					.bindTooltip("14", {
						permanent: true, 
						direction: "center",
						className: "markerLabel"
					})
					.addTo(this.map);
				}
			});

		}
	}
}