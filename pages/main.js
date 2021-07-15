import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import firebase from "../common/firebase";
import Navbar from "../components/navbar";
import setProfileModal from "../reducers/modal";

const main = () => {
	const profileModal = useSelector((state) => state.modal.profileModal);
	const dispatch = useDispatch();

	const handleClickNavbar = () => {
		alert("클릭은 됐어요");
		if (profileModal) {
			dispatch(setProfileModal(false));
		}
	};
	// const user = useSelector((state) => state.user);
	// console.log(user);
	// useEffect(() => {
	// 	if (user.email === null) {
	// 		alert("로그인 후 이용 가능합니다.");
	// 		Router.push("/");
	// 	}
	// }, []);
	return (
		<div>
			<Navbar onClick={(e) => handleClickNavbar}></Navbar>
		</div>
	);
};

export default main;
