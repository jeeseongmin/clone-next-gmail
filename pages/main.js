import React from "react";
import Layout from "../components/Layout";
import MailContainer from "../components/MailContainer";
import Head from "next/head";

const main = () => {
	return (
		<>
		<Head>
			<title>gmail</title>
			<meta
				name="google-site-verification"
				content="5OoTdfiuCbpvW90pjrj64IgiDszvnTSYT0qm9PUEluY"
			/>
		</Head>

		<Layout>
			<MailContainer class="z-0" />
		</Layout>
		</>
	);
};

export default main;
