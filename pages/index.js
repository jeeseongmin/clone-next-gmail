import React from "react";
import Image from "next/image";
import Logo from "../public/image/google.png";
import Logo2 from "../public/image/logo2.png";
import Router from "next/router";
import Head from "next/head";
import firebase from "../common/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, resetUser } from "../reducers/user";
import { resetMail } from "../reducers/mail";
import { resetThread } from "../reducers/thread";
import { resetModal } from "../reducers/modal";
import { setCurrentUser } from "../reducers/currentUser";

export default function login() {
	const dispatch = useDispatch();
	dispatch(resetUser());
	dispatch(resetModal());
	dispatch(resetThread());
	dispatch(resetMail());

	const googleLogin = async function () {
		// var provider = new firebase.auth.GoogleAuthProvider();
		// firebase
		// 	.auth()
		// 	.signInWithPopup(provider)
		// 	.then((res) => {
		// 		const login_payload = {
		// 			uuid: res.user.uid,
		// 			email: res.user.email,
		// 			name: res.user.displayName,
		// 			photoUrl: res.user.photoURL,
		// 			threadKeys: [],
		// 			myThread: {},
		// 			temp: [],
		// 		};
		// 		dispatch(addUser(login_payload));
		// 		dispatch(setCurrentUser(login_payload));
		// 		Router.push("/init");
		// 	});
		const login_payload = {
			uuid: "bRPleP6CYGMgNqWTEFzjdEpAQYZ2",
			email: "peration0422@gmail.com",
			name: "sungmin jee",
			photoUrl:
				"https://lh3.googleusercontent.com/a-/AOh14Gjwk0opSq_YqsaT_N72cgQkMpItkgk1PhBV01Ze=s96-c",
			threadKeys: [],
			myThread: {},
			temp: [],
		};
		dispatch(addUser(login_payload));
		dispatch(setCurrentUser(login_payload));
		Router.push("/init");
	};

	return (
		<>
			<Head>
				<title>gmail-clone login</title>
				<meta
					name="google-site-verification"
					content="5OoTdfiuCbpvW90pjrj64IgiDszvnTSYT0qm9PUEluY"
				/>
			</Head>
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
							class="border p-4 mb-8 w-96 mx-12 rounded-mg border-gray-300 shadow-md flex flex-row items-center cursor-pointer"
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
								구글 계정으로 로그인
							</div>
						</div>
						{/* <div
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
					</div> */}
						<div class="w-96 mx-12 text-left mb-8">
							내 컴퓨터가 아닌가요? 게스트 모드를 사용하여 비공개로
							로그인하세요.
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
		</>
	);
}
