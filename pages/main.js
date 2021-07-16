import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import firebase from "../common/firebase";
import Navbar from "../components/navbar";
import Leftbar from "../components/Leftbar";
import MailContainer from "../components/MailContainer";
import SendMailComponent from "../components/SendMailComponent";
import setProfileModal from "../reducers/modal";
import { setSendMail } from "../reducers/modal";

const main = () => {
	// close, open, mini
	const dispatch = useDispatch();
	const profileModal = useSelector((state) => state.modal.profileModal);
	const sendMail = useSelector((state) => state.modal.sendMail);

	return (
		<div class="min-h-screen flex flex-col relative">
			<Navbar />
			<div class="flex-1 flex flex-row ">
				<Leftbar />
				<MailContainer />
			</div>

			{sendMail !== "close" && <SendMailComponent />}
		</div>
	);
};

export default main;
