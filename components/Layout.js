import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../components/navbar";
import Leftbar from "../components/Leftbar";
import SendMailComponent from "../components/SendMailComponent";
import { resetModal, setProfileModal, setIsLongSide } from "../reducers/modal";

const Layout = (props) => {
	const dispatch = useDispatch();
	// 나중에는 firebaseAuth의 uuid로 바꾸기.
	const sendMail = useSelector((state) => state.modal.sendMail);
	const profileModal = useSelector((state) => state.modal.profileModal);

	const onProfileHide = () => {
		// dispatch(setProfileModal(false));
	};

	return (
		<div class="z-20 min-h-screen w-full flex flex-col relative">
			<Navbar />
			<div onClick={onProfileHide} class="w-full flex">
				<Leftbar />
				{props.children}
			</div>

			{sendMail !== "close" && <SendMailComponent />}
		</div>
	);
};

export default Layout;
