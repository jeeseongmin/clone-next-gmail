import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import firebase from "../common/firebase";

const main = () => {
	const user = useSelector();
	useEffect(() => {
		const user = firebase.auth().currentUser;
		if (!user) {
			alert("로그인 후 이용 가능합니다.");
			Router.push("/");
		}
	}, []);
	return <div>main!</div>;
};

export default main;
