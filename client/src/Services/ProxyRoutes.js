const proxyRoutes = {
	"/api": {
		target: "http://localhost:8081/api",
		changeOrigin: true,
		pathRewrite: {
			"^/api": ""
		}
	},
	"/other": {
		target: "http://localhost:8081/other",
		changeOrigin: true,
		pathRewrite: {
			"^/other": ""
		}
	}
	// Ajoutez d'autres routes ici
};

export default proxyRoutes;
