import express from 'express';
const router = express.Router();

// Exemple de route GET pour '/api/data'
router.get('/', (req, res) => {
  // Renvoyer des données en tant que réponse JSON
  res.json({ message: 'Exemple de données depuis une route API avec GET' });
});

// Exemple de route POST pour '/api/postData'
router.post('/', (req, res) => {
  // Récupérer les données envoyées via la requête POST
  // Effectuer des opérations avec les données reçues
  // Renvoyer une réponse appropriée
  res.json({ message: 'Exemple de données depuis une route API avec POST' });
});

export default router;