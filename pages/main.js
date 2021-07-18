import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { v4 as uuidv4 } from "uuid";

import firebase from "../common/firebase";
import Navbar from "../components/navbar";
import Leftbar from "../components/Leftbar";
import MailContainer from "../components/MailContainer";
import SendMailComponent from "../components/SendMailComponent";
// import setProfileModal from "../reducers/modal";
// import { setSendMail } from "../reducers/modal";
import { setMail, resetMail } from "../reducers/mail";
import { setThread } from "../reducers/thread";
import { editMythread, editKeys } from "../reducers/user";

const main = () => {
	// firebase에서 불러오는 user id 찾기.
	const dispatch = useDispatch();
	// 나중에는 firebaseAuth의 uuid로 바꾸기.
	const user = useSelector((state) => state.current_user);
	const sendMail = useSelector((state) => state.modal.sendMail);

	useEffect(() => {
		try {
			initData();
		} catch (error) {
			console.log(error);
			alert("로그인 후 이용 가능합니다.");
			Router.push("/");
		}
	}, []);

	const initData = async function () {
		const thread1 = uuidv4();
		const thread2 = uuidv4();
		const mail1 = uuidv4();
		const mail2 = uuidv4();
		const sender_uuid = "PuwwM38EJ7RziL9NRk2cwejibL83";
		const receiver_uuid = user.uuid;
		const payload = [
			{
				uuid: mail1,
				sender: sender_uuid,
				receiver: receiver_uuid,
				title: "처음 뵙겠습니다.",
				content: "지성민이라고 합니다.",
				created: new Date(),
				threadId: thread1,
			},
			{
				uuid: mail2,
				sender: sender_uuid,
				receiver: receiver_uuid,
				title: "리액트 재미있으신가요?",
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
		dispatch(editKeys(sender_uuid, [thread1, thread2]));
		dispatch(editKeys(receiver_uuid, [thread1, thread2]));
		dispatch(editMythread(sender_uuid, payload3));
		dispatch(editMythread(receiver_uuid, payload4));
	};

	return (
		<div class="min-h-screen w-full flex flex-col relative">
			<Navbar />
			<div class="w-full flex">
				<Leftbar />
				<MailContainer class="z-0" />
			</div>

			{sendMail !== "close" && <SendMailComponent />}
		</div>
	);
};

export default main;
