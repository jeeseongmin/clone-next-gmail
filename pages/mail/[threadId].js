import React from "react";
import Layout from "../../components/Layout";
// import MailContainer from "../components/MailContainer";
import { useRouter } from "next/router";
import ThreadComponent from "../../components/ThreadComponent";

const Post = () => {
	const router = useRouter();
	const { threadId } = router.query;
	return (
		<Layout>
			{/* <MailDetail /> */}
			<ThreadComponent thread={threadId} />
		</Layout>
	);
};

export default Post;
