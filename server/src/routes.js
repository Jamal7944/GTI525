import { StationForecast } from './stations/StationForecast.js';
import { StationInventory } from './stations/StationInventory.js';
import { StationMapping } from './stations/StationMapping.js';
import { StationPastHourlyForecast } from './stations/StationPastHourlyForecast.js';

export default function loadRoutes(app) {
	/**
 	* Route pour obtenir les données horaires d'une journée passée.
 	*/
	app.post("/station/past-hourly-forecast", async (req, res) => {
		// on s'attend à recevoir: 
		// { stationID: ..., year: ..., month: ..., day: ... };
	
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
	
			res.json({
				info: info,
				header: StationPastHourlyForecast.getPastHourlyForecastHeader()
			});
		}
		else {
			res.json({
				info: [],
				header: StationPastHourlyForecast.getPastHourlyForecastHeader(),
			})
		}
	});

	/**
	 * Route pour obtenir les prévisions des prochains jours.
	 */
	app.post("/station/forecast", async (req, res) => {
		let request = req.body;
		let stationID = Number.parseInt(request.stationID);
	
		if(stationID){
			let result = await StationForecast.getForecast(stationID);
			//console.log(result);
			res.json(result);
		}
	});

	/**
	 * 
	 */
	app.get("/station/info", async (req, res) => {
		let stationIDs = StationMapping.getStationIDs();
		let result = [];

		console.log(stationIDs);
		for(let i = 0; i < stationIDs.length; i++) {
			let inventoryEntry = StationInventory.getInfoFromID(stationIDs[i]);
			//console.log(inventoryEntry);

			if(inventoryEntry == null){
				console.log(stationIDs[i]);
				continue;
			}

			result.push({
				name: inventoryEntry["Name"],
				id: stationIDs[i],
				lat: inventoryEntry["Latitude (Decimal Degrees)"],
				lon: inventoryEntry["Longitude (Decimal Degrees)"]
			})
		}

		console.log(result);
		res.json(result);
	});
}
