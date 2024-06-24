import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import {Station} from "../Stations/Station.js";

const app = express();
const port = 8081;

app.use(express.json());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
	// Renvoyer des données en tant que réponse JSON
	res.json({
		message: "Exemple de données depuis une route API avec GET",
	});
});

app.get("/api", (req, res) => {
	// Renvoyer des données en tant que réponse JSON
	res.json({
		name: "bob",
		id: 4,
	});
});

app.post("/", (req, res) => {
	// Récupérer les données envoyées via la requête POST
	// Effectuer des opérations avec les données reçues
	// Renvoyer une réponse appropriée
	res.json({message: "Exemple de données depuis une route API avec POST"});
});

app.post("/api", (req, res) => {
	// Renvoyer des données en tant que réponse JSON
	console.log(req.body);
	let obj = req.body;
	obj["id"] = 4;
	res.json(obj);
});

app.listen(port, () => {
	console.log("Serveur en cours d'exécution sur le port " + port);
});
