import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { v4 as uuidv4 } from "uuid";

import firebase from "../common/firebase";
import Navbar from "../components/navbar";
import Leftbar from "../components/Leftbar";
import MailContainer from "../components/MailContainer";
import SendMailComponent from "../components/SendMailComponent";

import { setMail, resetMail } from "../reducers/mail";
import { setThread } from "../reducers/thread";
import { editMythread, editKeys } from "../reducers/user";

const main = () => {
	// firebase에서 불러오는 user id 찾기.
	const dispatch = useDispatch();
	// 나중에는 firebaseAuth의 uuid로 바꾸기.
	const sendMail = useSelector((state) => state.modal.sendMail);

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
