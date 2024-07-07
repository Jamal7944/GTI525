import proxyRoutes from "./src/Services/ProxyRoutes.js";
import webpack from "webpack";

export default {
	transpileDependencies: true,
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				__VUE_PROD_DEVTOOLS__: false,
				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
			})
		]
	},
};
