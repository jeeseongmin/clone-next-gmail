import React, { useState, useEffect, useRef } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FiMenu, FiUserPlus } from "react-icons/fi";
import { IoMdSearch, IoMdOptions } from "react-icons/io";
import { HiOutlineCamera } from "react-icons/hi";

import gmailLogo from "../public/image/gmailLogo.png";
import { resetModal, setProfileModal, setIsLongSide } from "../reducers/modal";
import { resetUser } from "../reducers/user";
import Image from "next/image";

const navbar = () => {
	const dispatch = useDispatch();
	// const userAuth = firebase.auth().currentUser;
	const profileModal = useSelector((state) => state.modal.profileModal);
	const isLongSide = useSelector((state) => state.modal.isLongSide);
	const userList = useSelector((state) => state.user);
	const profileRef = useRef(null);

	// ref 이외의 다른 부분을 클릭했을 때에 일어나야 하는 일
	useEffect(() => {
		if (!profileModal) return;
		function handleClick(e) {
			if (profileRef.current.contains(e.target)) {
			} else {
				dispatch(setProfileModal(false));
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [profileModal]);

	// 일단 임시로
	const user = useSelector((state) => state.current_user);

	const onToggleProfile = () => {
		dispatch(setProfileModal(!profileModal));
	};

	const onToggleSidebar = () => {
		dispatch(setIsLongSide(!isLongSide));
	};

	const logOut = () => {
		alert("로그아웃 되었습니다.");
		Router.push("/");
		dispatch(resetModal());
		// dispatch(resetUser());
	};

	return (
		<div class="h-19 flex flex-row justify-start items-center shadow-mg border-b-2 border-gray-100 ">
			<div class="w-64 mr-2 pr-4 pl-4 flex flex-row items-center flex-shrink-0">
				<FiMenu
					size={36}
					class="mr-6 p-2 cursor-pointer hover:rounded-full hover:bg-gray-300"
					onClick={onToggleSidebar}
				/>
				<Image
					src={gmailLogo}
					width={110}
					height={50}
					class="object-contain cursor-pointer"
					onClick={() => Router.push("/main")}
					alt="Picture of the author"
				/>
			</div>
			<div class="w-full flex my-2 flex-row">
				<div class="flex-1 max-w-screen-md h-15 flex flex-row justify-between items-center rounded-md bg-gray-100 border border-gray-100">
					<IoMdSearch
						size={42}
						color={"#5f6368"}
						class="mx-3 p-2 cursor-pointer hover:rounded-full hover:bg-gray-300"
					/>
					<input
						type="text"
						class="w-full h-13 py-2 bg-gray-100 border outline-none border-gray-100 text-left text-#5f6368"
						placeholder="메일 검색"
					/>
					<IoMdOptions
						size={42}
						color={"#5f6368"}
						class="mx-3 p-2 cursor-pointer hover:rounded-full hover:bg-gray-300"
					/>
				</div>
			</div>
			<div ref={profileRef} class="relative ml-8 z-30">
				{user && (
					<img
						src={user.photoUrl}
						width={40}
						height={40}
						class="z-30 mr-8 object-contain cursor-pointer rounded-full focus:shadow-mg "
						onClick={onToggleProfile}
						alt="Picture of the author"
					/>
				)}
				{profileModal && (
					<div class="z-30 absolute m-4 pt-8 shadow-lg bg-white rounded-lg w-96 h-auto top-19 right-0 border border-gray-300">
						<div class="w-full flex flex-col justify-content items-center text-center border-b-2 border-gray-100 ">
							<div class="relative mb-4">
								<img
									src={user.photoUrl}
									width={80}
									height={80}
									class="object-contain cursor-pointer rounded-full"
									alt="Picture of the author"
								/>
								<div class="absolute p-1 cursor-pointer bg-white -bottom-1 -right-1 shadow-lg rounded-full">
									<HiOutlineCamera size={20} />
								</div>
							</div>
							<p class="font-bold">{user.name}</p>
							<p class="text-#5f6368 mb-4">{user.email}</p>
							<div class="rounded-3xl px-4 mb-4 py-1 border border-gray-300 shadow-sm text-semibold">
								Google 계정 관리
							</div>
						</div>
						<div class="w-full flex px-16 py-4 flex-row justify-content items-center border-b-2 border-gray-100 cursor-pointer">
							<FiUserPlus size={20} color={"#5f6368"} class="mr-4" />
							<p class="font-medium">다른 계정 추가</p>
						</div>
						<div class="w-full py-4 flex flex-col justify-content items-center text-center border-b-2 border-gray-100 ">
							<button
								class="border border-gray-300 rounded-lg px-6 py-2 cursor-pointer"
								onClick={logOut}
							>
								로그아웃
							</button>
						</div>
						<div class="w-full py-6 flex flex-col justify-content items-center text-center ">
							<p class="text-xs">
								<a
									class="cursor-pointer"
									href="https://policies.google.com/privacy?hl=ko"
								>
									개인정보처리방침
								</a>{" "}
								·{" "}
								<a
									class="cursor-pointer"
									href="https://policies.google.com/terms?hl=ko"
								>
									서비스 약관
								</a>
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default navbar;
