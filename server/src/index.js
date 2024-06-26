import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { Station } from './Station.js';

const app = express();
const port = 8081;

app.use(express.json());
app.use('/api', apiRoutes)
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("../client/dist"));

app.get('/', (req, res) => {
	// Renvoyer des données en tant que réponse JSON
	res.json({ message: 'Exemple de données depuis une route API avec GET' });
});

app.post('/', (req, res) => {
	// Récupérer les données envoyées via la requête POST
	// Effectuer des opérations avec les données reçues
	// Renvoyer une réponse appropriée
	res.json({ message: 'Exemple de données depuis une route API avec POST' });
});

app.get("/station/past-hourly-forecast", (req, res) => {
	/* on s'attend à recevoir:
	{
		stationID: ...,
		year: ...,
		month: ...,
		day: ...,
	};
	*/
	let request = JSON.parse(req.body);
	let info = Station.getPastHourlyForecast(request.stationID, request.year, request.month, request.day);
	let header = Station.getPastHourlyForecastHeader();

	res.json({
		info: info,
		header: header
	});
})

app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
