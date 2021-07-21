import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Router from "next/router";

import Loader from "../components/Loader";

import configureStore from "../config/store";
const { store, persistor } = configureStore();

const MyApp = ({ Component, pageProps }) => {
	const [loading, setLoading] = useState(false);
	Router.events.on("routeChangeStart", (url) => {
		console.log("Route is changing...");
		setLoading(true);
	});

	Router.events.on("routeChangeComplete", (url) => {
		console.log("Route is changing is complete...");
		setLoading(false);
	});

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				{/* {loading && <Loader />} */}
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
};

export default MyApp;
