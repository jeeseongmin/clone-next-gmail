import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Link from "next/link";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { FaMailBulk } from "react-icons/fa";
import { editMythread } from "../reducers/user";
import {
	addCheckThread,
	deleteCheckThread,
	resetCheckThread,
} from "../reducers/modal";
import {
	IoMdMailOpen,
	IoMdSend,
	IoMdDocument,
	IoMdTrash,
} from "react-icons/io";
// import { IoTime } from "react-icons/io5";
// import { HiSave } from "react-icons/hi";

const Mail = (props) => {
	const dispatch = useDispatch();
	const { thread, type, allCheck } = props;
	const [mailMenu, setMailMenu] = useState(false); // 메일 별 hover 여부
	const mailList = useSelector((state) => state.mail.objs);
	const current_user = useSelector((state) => state.current_user);
	const userList = useSelector((state) => state.user.objs);
	const checkThread = useSelector((state) => state.modal.checkThread);
	const threadObjs = useSelector((state) => state.thread.objs);
	var isChecked = allCheck ? true : checkThread.includes(thread);

	const firstId = threadObjs[thread].mailList[0];
	const title = mailList[firstId].title;

	const user = userList[current_user.uuid];

	const myThread = user.myThread;

	const isStarred = myThread[thread].starred.length === 0 ? false : true; // 메일 별 별표 여부
	if (type === "starred" && !isStarred) {
		return <></>;
	}
	let isDeleted = myThread[thread].deleted.length === 0 ? false : true;
	if (type === "deleted") {
		isDeleted = false;
	}
	const isRead = myThread[thread].isRead;
	const received = myThread[thread].received;
	const sent = myThread[thread].sent;
	const starred = myThread[thread].starred;
	const deleted = myThread[thread].deleted;

	// 스레드의 가장 마지막에 있는 항목
	var mailId = "";
	if (type === "received") mailId = received[received.length - 1];
	else if (type === "sent") mailId = sent[sent.length - 1];
	else if (type === "starred") mailId = starred[starred.length - 1];
	else if (type === "deleted") mailId = deleted[deleted.length - 1];

	const currentMail = mailList[mailId];

	/* 메일 별 날짜 계산 */
	var date = new Date(currentMail.created);
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const hour = date.getHours();
	const minute = date.getMinutes();

	const onMouseOverMail = () => {
		setMailMenu(true);
	};
	const onMouseOutMail = () => {
		setMailMenu(false);
	};

	// 메일 리스트에서 별표편지 toggle
	const onClickStar = () => {
		// 없애기
		if (isStarred) {
			const cp = { ...myThread };
			const _starredList = cp[thread].starred;
			_starredList.pop();
			cp[thread].starred = _starredList;
			dispatch(editMythread(thread, cp));
		}
		//
		else {
			const cp = { ...myThread };
			const _starredList = cp[thread].starred;
			_starredList.push(mailId);
			cp[thread].starred = _starredList;
			dispatch(editMythread(thread, cp));
		}
	};

	const onClickBox = () => {
		// 현재 스레드가 체크되어있다면,
		if (isChecked) {
			dispatch(deleteCheckThread(thread));
		}
		// 체크 안되어있다면,
		else {
			dispatch(addCheckThread(thread));
		}
	};

	const onDeleteThread = () => {
		const cp = { ...myThread };
		const _deletedList = cp[thread].deleted;
		if (!_deletedList.includes(thread)) {
			_deletedList.push(mailId);
		}
		cp[thread].deleted = _deletedList;
		dispatch(editMythread(thread, cp));
	};

	const onReadThread = () => {
		const cp = { ...myThread };
		cp[thread].isRead = true;
		dispatch(editMythread(thread, cp));
	};

	const onNotReadThread = () => {
		const cp = { ...myThread };
		cp[thread].isRead = false;
		dispatch(editMythread(thread, cp));
	};

	return (
		<>
			{!isDeleted && (
				<div
					onMouseOver={onMouseOverMail}
					onMouseOut={onMouseOutMail}
					class={
						"w-full h-10 px-2 cursor-pointer flex flex-col justify-start items-center border-b-2  hover:shadow-lg hover:z-10 " +
						(isRead
							? "bg-gray-100 border-gray-200 "
							: "bg-white border-gray-100 ") +
						(isChecked ? "bg-blue-300 border-b border-gray-100" : "")
					}
				>
					<div class="w-full h-10 flex flex-row">
						<div
							onClick={onClickBox}
							class={
								"w-10 p-2 flex-grow-0 flex-shrink-0 flex rounded-full justify-center items-center " +
								(isChecked ? "hover:bg-blue-500" : "hover:bg-gray-100")
							}
						>
							{isChecked ? (
								<MdCheckBox size={24} class="text-black " />
							) : (
								<MdCheckBoxOutlineBlank
									size={24}
									class={mailMenu ? "text-gray-700" : "text-gray-200"}
								/>
							)}
						</div>

						{type !== "deleted" && (
							<div
								onClick={onClickStar}
								class="h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-100"
							>
								{isStarred ? (
									<AiFillStar size={22} class="text-yellow-300" />
								) : (
									<AiOutlineStar
										size={22}
										class={mailMenu ? "text-gray-700" : "text-gray-200"}
									/>
								)}
							</div>
						)}
						{type === "deleted" && (
							<div class="flex justify-start items-center">
								<IoMdTrash
									size={32}
									class="text-gray-500 p-1 cursor-auto rounded-full "
								/>
							</div>
							// <div class="h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-100">
							// </div>
						)}

						{(type === "received" || type === "starred") && (
							<Link href="mail/[threadId]" as={`mail/${thread}`}>
								<div class=" w-52 p-2 pr-8 text-sm flex justify-center items-center">
									<p
										class={"truncate " + (isRead ? "font-noraml" : "font-bold")}
									>
										{userList[currentMail.sender].name} (
										{userList[currentMail.sender].email})
									</p>
								</div>
							</Link>
						)}
						{type === "sent" && (
							<Link href="mail/[threadId]" as={`mail/${thread}`}>
								<div class=" w-52 p-2 pr-8 text-sm flex justify-center items-center">
									<p
										class={"truncate " + (isRead ? "font-noraml" : "font-bold")}
									>
										받는 사람 : {userList[currentMail.receiver].email}
									</p>
								</div>
							</Link>
						)}
						<Link href="mail/[threadId]" as={`mail/${thread}`}>
							<div class=" h-full p-2 flex-1 text-sm flex justify-start items-center">
								{type === "sent" && (
									<span class="text-xs px-1 py-0.5 mr-3 rounded-md bg-gray-300 text-gray-600 items-center">
										받은편지함
									</span>
								)}
								<p
									class={
										"h-full overflow-hidden " +
										(isRead ? "font-noraml" : "font-bold")
									}
								>
									{title}
								</p>
							</div>
						</Link>
						<div
							class={
								"w-48 flex justify-end items-center " +
								(mailMenu ? "block" : "hidden")
							}
						>
							{/* <HiSave
						size={32}
						title="보관처리"
						class="text-gray-500 mx-2 p-1 rounded-full hover:text-black hover:bg-gray-200"
					/> */}
							{type === "deleted" && (
								<IoMdTrash
									size={32}
									title="삭제"
									class="text-gray-500 mx-2 p-1 cursor-not-allowed rounded-full "
								/>
							)}

							{type !== "deleted" && (
								<IoMdTrash
									size={32}
									title="삭제"
									onClick={onDeleteThread}
									class="text-gray-500 mx-2 p-1 rounded-full hover:text-black hover:bg-gray-200"
								/>
							)}
							{!isRead ? (
								<IoMdMailOpen
									size={32}
									title="읽은 상태로 표시"
									onClick={onReadThread}
									class="text-gray-500 mx-2 p-1 rounded-full hover:text-black hover:bg-gray-200"
								/>
							) : (
								<FaMailBulk
									size={32}
									title="읽지 않은 상태로 표시"
									onClick={onNotReadThread}
									class="text-gray-500 mx-2 p-1 rounded-full hover:text-black hover:bg-gray-200"
								/>
							)}
							{/* <IoTime
						size={32}
						title="다시 알림"
						class="text-gray-500 mx-2 p-1 rounded-full hover:text-black hover:bg-gray-200"
					/> */}
						</div>
						<div
							class={
								" w-48 text-sm p-2 flex justify-center items-center " +
								(mailMenu ? "hidden" : "block")
							}
						>
							<p class={"text-sm " + (isRead ? "font-noraml" : "font-bold")}>
								{month}월 {day}일
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Mail;
