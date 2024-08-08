import L from "leaflet"
//import { ObjParser } from "./Utils/Parser";
import { MapDataParser } from "./Utils/MapDataParser";

//const regexForecast = "(Maximum|Minimum) [0-9]+";
//const regexCurrentTemp = "[0-9]+(,|)[0-9]+°C";

export default {
	name: "MapForecast",

	data() {
		return {
			map: null,
			layer: null,
			stations: [],
			forecast: [],
			displayed: [],
			defaultLocation: [54.54, -95.14],
			defaultZoom: 2,
		}
	},

	mounted() {
		this.loadMap();
	},

	methods: {

		recenterOnClick() {
			this.map.setView(this.defaultLocation, this.defaultZoom);
		},

		optionChanged() {
			this.map.setView(this.defaultLocation, this.defaultZoom);
			this.layer.clearLayers();
			let option = document.getElementById("dayOption").selectedIndex;

			for (let i = 0; i < this.stations.length; i++) {
				let stationID = `s${this.stations[i].id}`;
				let temperature = this.forecast[stationID][option].temperature;
				let moment = this.forecast[stationID][option].moment;
				let className = (moment == "nuit") ? "markerLabelNight" : "markerLabelDay";

				L.marker([this.stations[i].lat, this.stations[i].lon])
					.bindTooltip(temperature, {
						permanent: true,
						direction: "center",
						className: className
					})
					.bindPopup(this.forecast[stationID][option].details)
					.addTo(this.layer);
			}
		},

		async loadStations() {
			/*
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
			*/

			let response = await fetch("http://localhost:8081/station/map-info");
			let json = await response.json();
			this.stations = json;
			console.log(this.stations);
		},

		async loadForecast() {
			for (let i = 0; i < this.stations.length; i++) {
				let info = {
					headers: { "Content-Type": "application/json" },
					method: "POST",
					mode: "cors",
					body: JSON.stringify({ stationID: this.stations[i].id })
				};

				let response = await fetch("http://localhost:8081/station/forecast", info)
				if (response.ok) {
					let json = await response.json();
					let parserResult = MapDataParser.parse(json);
					console.log(parserResult);
					let stationID = `s${this.stations[i].id}`;
					this.forecast[stationID] = parserResult
				}
				else {
					console.log(response.body);
				}
			}
		},

		async loadMap() {
			// fix: https://stackoverflow.com/questions/65981712/uncaught-typeerror-this-map-is-null-vue-js-3-leaflet
			// Les animations de zoom ont été désactivées car VueJS et Leaflet ne semblent pas bien fonctionner ensemble.
			this.map = L.map('mapContainer', {zoomAnimation: false}).setView(this.defaultLocation, this.defaultZoom);
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(this.map);

			this.layer = L.layerGroup().addTo(this.map);

			await this.loadStations();
			await this.loadForecast();
			await this.forecast;

			for (let i = 0; i < this.stations.length; i++) {
				let stationID = `s${this.stations[i].id}`;
				let temperature = this.forecast[stationID][0].temperature;
				let moment = this.forecast[stationID][0].moment;
				let className = (moment == "nuit") ? "markerLabelNight" : "markerLabelDay";

				L.marker([this.stations[i].lat, this.stations[i].lon])
					.bindTooltip(temperature, {
						permanent: true,
						direction: "center",
						className: className
					})
					.bindPopup(this.forecast[stationID][0].details)
					.addTo(this.layer);
			}

			let defaultStationID = `s${this.stations[0].id}`;
			let forecasts = await this.forecast;

			for(let i = 0; i < forecasts[defaultStationID].length; i++) {
				this.displayed.push(forecasts[defaultStationID][i].displayed);
			}
		}
	}
}