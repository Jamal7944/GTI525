import { StationForecast } from './stations/StationForecast.js';
import { StationInventory } from './stations/StationInventory.js';
import { StationMapping } from './stations/StationMapping.js';
import { StationPastHourlyForecast } from './stations/StationPastHourlyForecast.js';

export default function loadRoutes(app) {

	/**
	 * Route pour obtenir les données horaires d'une journée passée.
	 */
	app.post("/station/past-hourly-forecast", async (req, res) => {
		let request = req.body;
		let stationID = Number.parseInt(request.stationID);
		let stationMapping = StationMapping.getFromID(stationID);

		if (stationMapping.success) {
			let station_ids = stationMapping.result.station_ids;
			let info = [];
			for (let i = 0; i < station_ids.length; i++) {
				if (info.length == 0) {
					let result = await StationPastHourlyForecast.getPastHourlyForecast(station_ids[i], request.year, request.month, request.day);
					info = result;
				}
			}
			res.status(200).json({
				info: info,
				header: StationPastHourlyForecast.getPastHourlyForecastHeader()
			});
		} else {
			res.status(404).json({
				info: [],
				header: StationPastHourlyForecast.getPastHourlyForecastHeader(),
				message: "Station ID not found"
			});
		}
	});

	/**
	 * Route pour obtenir les prévisions des prochains jours.
	 */
	app.post("/station/forecast", async (req, res) => {
		let request = req.body;
		let stationID = Number.parseInt(request.stationID);

		if (stationID) {
			let result = await StationForecast.getForecast(stationID);
			res.status(200).json({
				forecast: result,
				links: {
					self: `/station/forecast?stationID=${stationID}`
				}
			});
		} else {
			res.status(400).json({
				message: "Bad request: Missing stationID"
			});
		}
	});

	/**
	 * Route pour obtenir les informations de la carte des stations.
	 */
	app.get("/station/map-info", async (req, res) => {
		let stationIDs = StationMapping.getStationIDs();
		let result = [];

		for (let i = 0; i < stationIDs.length; i++) {
			let inventoryEntry = StationInventory.getInfoFromID(stationIDs[i]);

			if (inventoryEntry == null) {
				continue;
			}

			result.push({
				name: inventoryEntry["Name"],
				id: stationIDs[i],
				lat: inventoryEntry["Latitude (Decimal Degrees)"],
				lon: inventoryEntry["Longitude (Decimal Degrees)"]
			});
		}

		res.status(200).json({
			stations: result,
			links: {
				self: "/station/map-info"
			}
		});
	});
}
