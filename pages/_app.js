import React from "react";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "../config/store";
const { store, persistor } = configureStore();

const MyApp = ({ Component, pageProps }) => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
};

export default MyApp;
