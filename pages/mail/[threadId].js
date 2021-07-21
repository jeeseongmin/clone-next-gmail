import React from "react";
import Layout from "../../components/Layout";
// import MailContainer from "../components/MailContainer";
import { useRouter } from "next/router";
import ThreadComponent from "../../components/ThreadComponent";
import Head from "next/head";

const Post = () => {
	const router = useRouter();
	const { threadId } = router.query;
	return (
		<>
			<Head>
				<title>Gmail Detail</title>
				<meta
					name="google-site-verification"
					content="5OoTdfiuCbpvW90pjrj64IgiDszvnTSYT0qm9PUEluY"
				/>
			</Head>
			<Layout>
				{/* <MailDetail /> */}
				<ThreadComponent thread={threadId} />
			</Layout>
		</>
	);
};

export default Post;
