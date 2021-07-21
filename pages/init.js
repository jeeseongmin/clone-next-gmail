import React, { useEffect } from "react";
import Layout from "../components/Layout";
import MailContainer from "../components/MailContainer";
import { useDispatch, useSelector } from "react-redux";

import Router from "next/router";

import { v4 as uuidv4 } from "uuid";
import { editMythread, editKeys, addUser } from "../reducers/user";
import { setMail } from "../reducers/mail";
import { setThread } from "../reducers/thread";

const init = () => {
	const dispatch = useDispatch();
	const current_user = useSelector((state) => state.current_user);
	const userObjs = useSelector((state) => state.user.objs);

	useEffect(() => {
		console.log("initData");
		// 나중에는 firebaseAuth의 uuid로 바꾸기.
		const thread1 = uuidv4();
		const thread2 = uuidv4();
		const mail1 = uuidv4();
		const mail2 = uuidv4();
		dispatch(addUser(current_user));
		const sender_uuid = "PuwwM38EJ7RziL9NRk2cwejibL83";
		const receiver_uuid = current_user.uuid;
		const payload = [
			{
				uuid: mail1,
				sender: sender_uuid,
				receiver: receiver_uuid,
				title: "Ringle 부트캠프 모집 공고",
				content: "7월 한달 간, Ringle에서 부트캠프를 개최합니다.",
				created: new Date(),
				threadId: thread1,
			},
			{
				uuid: mail2,
				sender: sender_uuid,
				receiver: receiver_uuid,
				title: "반갑습니다 ㅎㅎ ",
				content: "어렵지만, 배우는 재미가 있습니다.",
				created: new Date(),
				threadId: thread2,
			},
		];
		dispatch(setMail(payload));
		const payload2 = [
			{
				uuid: thread1,
				mailList: [mail1],
			},
			{
				uuid: thread2,
				mailList: [mail2],
			},
		];
		dispatch(setThread(payload2));
		var payload3 = {};
		payload3[thread1] = {
			sent: [mail1],
			received: [],
			starred: [],
			deleted: [],
			isRead: false,
		};
		payload3[thread2] = {
			sent: [mail2],
			received: [],
			starred: [],
			deleted: [],
			isRead: false,
		};
		var payload4 = {};
		payload4[thread1] = {
			sent: [],
			received: [mail1],
			starred: [],
			deleted: [],
			isRead: false,
		};
		payload4[thread2] = {
			sent: [],
			received: [mail2],
			starred: [],
			deleted: [],
			isRead: false,
		};
		console.log("User objs", userObjs);
		console.log("current ", current_user);
		dispatch(editKeys(sender_uuid, [thread1, thread2]));
		dispatch(editKeys(receiver_uuid, [thread1, thread2]));
		dispatch(editMythread(sender_uuid, payload3));
		dispatch(editMythread(receiver_uuid, payload4));
		Router.push("/main");
	}, []);

	return (
		<div></div>
		// <Layout>
		// 	<MailContainer class="z-0" />
		// </Layout>
	);
};

export default init;
