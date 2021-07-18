import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { editMythread } from "../reducers/user";
import {
	IoMdMailOpen,
	IoMdSend,
	IoMdDocument,
	IoMdTrash,
} from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { HiSave } from "react-icons/hi";

const Mail = (props) => {
	const dispatch = useDispatch();
	const { thread, type } = props;
	const [mailMenu, setMailMenu] = useState(false); // 메일 별 hover 여부
	const mailList = useSelector((state) => state.mail.objs);
	const current_user = useSelector((state) => state.current_user);
	const userList = useSelector((state) => state.user.objs);
	const user = userList[current_user.uuid];

	const myThread = user.myThread;

	const isStarred = myThread[thread].starred.length === 0 ? false : true; // 메일 별 별표 여부
	const received = myThread[thread].received;
	const mailId = received[received.length - 1];
	const currentMail = mailList[mailId];

	/* 메일 별 날짜 계산 */
	var date = new Date(currentMail.created);
	const month = date.getMonth() + 1;
	const day = date.getDate();

	//
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

	return (
		<div
			onMouseOver={onMouseOverMail}
			onMouseOut={onMouseOutMail}
			class="w-full h-10 px-2 cursor-pointer flex flex-col justify-start items-center border-b-2 border-gray-100 hover:shadow-lg "
		>
			<div class="w-full h-10 flex flex-row">
				<div class="w-10 p-2 flex-grow-0 flex-shrink-0 flex rounded-full justify-center items-center hover:bg-gray-100 ">
					<MdCheckBoxOutlineBlank
						size={24}
						class={mailMenu ? "text-gray-700" : "text-gray-200"}
					/>
				</div>
				<div
					onClick={onClickStar}
					class="h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-100"
				>
					{isStarred ? (
						<AiFillStar size={24} class="text-yellow-300" />
					) : (
						<AiOutlineStar
							size={24}
							class={mailMenu ? "text-gray-700" : "text-gray-200"}
						/>
					)}
				</div>
				<div class=" w-52 p-2 pr-8 text-sm flex justify-center items-center">
					<p class="truncate">
						<b>{userList[currentMail.sender].email}</b>
					</p>
				</div>
				<div class=" h-full p-2 flex-1 text-sm flex justify-start items-center">
					<p class="h-full overflow-hidden ">
						<b>{currentMail.title}</b>
					</p>
				</div>
				<div
					class={
						"w-48 flex justify-center items-center " +
						(mailMenu ? "block" : "hidden")
					}
				>
					<HiSave
						size={32}
						title="보관처리"
						class="text-gray-500 mx-2 p-1 rounded-full hover:text-black hover:bg-gray-200"
					/>
					<IoMdTrash
						size={32}
						title="삭제"
						class="text-gray-500 mx-2 p-1 rounded-full hover:text-black hover:bg-gray-200"
					/>
					<IoMdMailOpen
						size={32}
						title="읽은 상태로 표시"
						class="text-gray-500 mx-2 p-1 rounded-full hover:text-black hover:bg-gray-200"
					/>
					<IoTime
						size={32}
						title="다시 알림"
						class="text-gray-500 mx-2 p-1 rounded-full hover:text-black hover:bg-gray-200"
					/>
				</div>
				<div
					class={
						" w-48 text-sm p-2 flex justify-center items-center " +
						(mailMenu ? "hidden" : "block")
					}
				>
					<p class="text-sm">
						<b>
							{month}월 {day}일
						</b>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Mail;
