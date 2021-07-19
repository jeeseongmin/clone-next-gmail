import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../public/image/google.png";
import Logo2 from "../public/image/logo2.png";
import Router from "next/router";
import firebase from "../common/firebase";
// import main from "./main";
import { useDispatch, useSelector } from "react-redux";
import {
	addUser,
	setUser,
	resetUser,
	editMythread,
	editKeys,
} from "../reducers/user";
import { setMail, resetMail } from "../reducers/mail";
import { setThread } from "../reducers/thread";
import { resetModal } from "../reducers/modal";
import {
	setUuid,
	setName,
	setPhotoUrl,
	setEmail,
} from "../reducers/currentUser";

import { v4 as uuidv4 } from "uuid";

export default function login() {
	const dispatch = useDispatch();
	dispatch(resetUser());
	dispatch(resetModal());
	const user = useSelector((state) => state.current_user);

	const googleLogin = async function () {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((res) => {
				const login_payload = {
					uuid: res.user.uid,
					email: res.user.email,
					name: res.user.displayName,
					photoUrl: res.user.photoURL,
					threadKeys: [],
					myThread: {},
					temp: [],
				};
				dispatch(addUser(login_payload.uuid, login_payload));
				dispatch(setUuid(login_payload.uuid));
				dispatch(setName(login_payload.name));
				dispatch(setPhotoUrl(login_payload.photoUrl));
				dispatch(setEmail(login_payload.email));
				initData();
				Router.push("/main");
			});
	};
	const initData = async function () {
		console.log("initData");
		// 나중에는 firebaseAuth의 uuid로 바꾸기.

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
				title: "Ringle 부트캠프 모집 공고",
				content: "7월 한달 간, Ringle에서 부트캠프를 개최합니다.",
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
	// const generalLogin = async function () {
	// 	const payload = {
	// 		uuid: "aigb4gee1shi6p9K33wLFSVKJFu2",
	// 		email: "puppy@gmail.com",
	// 		name: "Puppy",
	// 		photoUrl:
	// 			"https://lh3.googleusercontent.com/a-/AOh14Gjwk0opSq_YqsaT_N72cgQkMpItkgk1PhBV01Ze=s96-c",
	// 		threadKeys: [],
	// 		myThread: {},
	// 		temp: [],
	// 	};
	// 	dispatch(addUser(payload.uuid, payload));
	// 	dispatch(setUuid(payload.uuid));
	// 	dispatch(setName(payload.name));
	// 	dispatch(setPhotoUrl(payload.photoUrl));
	// 	dispatch(setEmail(payload.email));
	// 	// initData();
	// 	Router.push("/main");
	// };

	return (
		<div class="w-full min-h-screen border flex justify-center flex-col items-center">
			<div class="py-12  mb-4 border border-gray-300 rounded-lg flex flex-col justify-center text-center relative">
				<div class="w-full mb-4">
					<Image
						src={Logo}
						width={80}
						height={30}
						alt="Picture of the author"
					/>
				</div>
				<h2 class="mb-2 text-xl font-medium">로그인</h2>
				<p class="mb-8">Google 계정 사용</p>
				<div class="w-full mb-8 relative flex justify-center flex-col">
					<div
						class="border p-4 w-96 mx-12 rounded-mg border-gray-300 shadow-md flex flex-row items-center cursor-pointer"
						onClick={googleLogin}
					>
						<Image
							src={Logo2}
							width={40}
							height={30}
							class="flex-1"
							alt="Picture of the author"
						/>
						<div class="w-full flex-shrink text-center">
							내 구글 계정으로 로그인
						</div>
					</div>
					<div
						class="border p-3 w-96 mb-8 mx-12 rounded-mg border-gray-300 shadow-md flex flex-row items-center cursor-pointer"
						onClick={() => alert("본인 계정으로 진행해주세요.")}
					>
						<img
							src="https://lh3.googleusercontent.com/a-/AOh14Gjwk0opSq_YqsaT_N72cgQkMpItkgk1PhBV01Ze=s96-c"
							width={40}
							height={30}
							class="flex-1 rounded-full"
							alt="Picture of the author"
						/>
						<div class="w-full flex-shrink text-center">Puppy로 로그인</div>
					</div>
					<div class="w-96 mx-12 text-left mb-8">
						내 컴퓨터가 아닌가요? 게스트 모드를 사용하여 비공개로 로그인하세요.{" "}
						<span class="text-blue-600 cursor-pointer">
							<a href="https://support.google.com/chrome/answer/6130773?hl=ko">
								자세히 알아보기
							</a>
						</span>
					</div>
					<div class="w-96 mx-12 text-left">
						<span class="text-blue-600 cursor-pointer">
							<a href="https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp">
								계정 만들기
							</a>
						</span>
					</div>
				</div>
				<div class="w-96 rounded-lg flex justify-end text-right absolute -bottom-12 -right-2">
					<div class="flex flex-row justify-end">
						<p class="ml-4">
							<a href="https://support.google.com/accounts?hl=ko#topic=3382296">
								도움말
							</a>
						</p>
						<p class="ml-4">
							<a href="https://policies.google.com/privacy?gl=KR&hl=ko">
								개인정보 보호
							</a>
						</p>
						<p class="ml-4">
							<a href="https://policies.google.com/terms?gl=KR&hl=ko">약관</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
