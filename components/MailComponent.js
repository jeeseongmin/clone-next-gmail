import React, { useState, useRef } from "react";
import gmailLogo from "../public/image/gmailLogo.png";
import {
	MdRefresh,
	MdCheckBoxOutlineBlank,
	MdCheckBox,
	MdReply,
} from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiArrowDropDownFill } from "react-icons/ri";
import { resetCheckThread } from "../reducers/modal";
import { useDispatch, useSelector } from "react-redux";

import { addThread } from "../reducers/thread";
import { addMail } from "../reducers/mail";
import { setSendMail } from "../reducers/modal";
import { editUser, addUser, editMythread, editKeys } from "../reducers/user";
import { v4 as uuidv4 } from "uuid";

const MailComponent = (props) => {
	const dispatch = useDispatch();
	const [isOpenReply, setIsOpenReply] = useState(false);

	const closeReplyModal = () => {
		setIsOpenReply(false);
		setReplyContent({
			title: "",
			receiver: "",
			content: "",
		});
	};

	const openReplyModal = () => {
		setIsOpenReply(true);
		setReplyContent({
			title: "",
			receiver: mail.sender === current_user ? mail.receiver : mail.sender,
			content: "",
		});
	};

	const mailId = props.mailId;
	const replyRef = useRef(null);
	const current_user = useSelector((state) => state.current_user);
	const mailObjs = useSelector((state) => state.mail.objs);
	const userObjs = useSelector((state) => state.user.objs);
	const threadObjs = useSelector((state) => state.thread.objs);
	const mail = mailObjs[mailId];
	const type = mail.receiver === current_user.uuid ? "received" : "sent";
	const [replyContent, setReplyContent] = useState({
		title: "",
		receiver: mail.sender === current_user ? mail.receiver : mail.sender,
		content: "",
	});

	const handleChange = (e, key) => {
		const cp = { ...replyContent };
		cp[key] = e.target.value;
		setReplyContent(cp);
	};

	const sendReply = async function () {
		console.log(replyContent);
		if (replyContent.receiver === "" || replyContent.content === "") {
			alert("정보를 입력해주세요.");
		} else {
			// 0. user 생성
			const receiver = {
				uuid: replyContent.receiver,
				email: userObjs[replyContent.receiver].email,
				name: userObjs[replyContent.receiver].name,
				photoUrl: "",
				threadKeys: [],
				myThread: {},
				temp: [],
			};
			dispatch(addUser(receiver));
			// 1. mail object 생성
			const mail_payload = {
				uuid: uuidv4(),
				sender: current_user.uuid,
				receiver: receiver.uuid,
				title: replyContent.title,
				content: replyContent.content,
				created: new Date(),
				threadId: mail.threadId,
			};
			dispatch(addMail(mail_payload.uuid, mail_payload));

			// // 2. thread 생성
			const thread_payload = {
				uuid: mail_payload.threadId,
				mailList: [mail_payload.uuid],
			};
			dispatch(addThread(thread_payload.uuid, thread_payload));

			// 3. user에 해당 thread 공간 만들기
			var newPayload1 = { ...userObjs[current_user.uuid].myThread };
			newPayload1[thread_payload.uuid].sent = [
				...userObjs[current_user.uuid].myThread.sent,
				mail_payload.uuid,
			];
			newPayload1[thread_payload.uuid].isRead = true;

			var newPayload2 = { ...userObjs[receiver.uuid].myThread };
			newPayload2[thread_payload.uuid].received = [
				...userObjs[current_user.uuid].myThread.received,
				mail_payload.uuid,
			];
			newPayload2[thread_payload.uuid].isRead = false;

			dispatch(
				editKeys(current_user.uuid, [
					...userList[current_user.uuid].threadKeys,
					thread_payload.uuid,
				])
			);
			dispatch(
				editKeys(receiver.uuid, [
					...userList[receiver.uuid].threadKeys,
					thread_payload.uuid,
				])
			);
			dispatch(editMythread(current_user.uuid, newPayload1));
			dispatch(editMythread(receiver.uuid, newPayload2));
			console.log(userObjs);

			closeModal();

			// alert("메일이 전송되었습니다!");
		}
	};

	return (
		<>
			{/* 토글 1 */}
			<div class="w-full h-auto px-4 pb-4 flex flex-col justify-center items-center border-b border-gray-200">
				<div class="w-full py-4 flex flex-row justify-between items-center">
					<div class="w-16 mr-2 h-full flex-shrink flex justify-center">
						<img
							src={userObjs[mail.sender].photoUrl}
							width={45}
							height={45}
							class="object-contain rounded-full border border-gray-200"
							alt="Picture of the author"
						/>
					</div>
					<div class="flex-1 h-full flex flex-row justify-between items-center">
						{type === "received" && (
							<div class="flex h-full flex-col justify-start">
								<p class="font-bold">{userObjs[mail.sender].email}</p>
								<p class="text-xs">나에게</p>
							</div>
						)}
						{type === "sent" && (
							<div class="flex h-full flex-col justify-start">
								<p class="font-bold">
									{userObjs[current_user.uuid].name}
									<span class="font-normal text-xs">
										{" "}
										({userObjs[current_user.uuid].email})
									</span>
								</p>
								<p class="text-xs">{userObjs[mail.sender].email}에게</p>
							</div>
						)}
						<div class="h-full flex flex-col items-center justify-center ">
							<p class="text-xs">6월 20일 (일) 오전 6:15</p>
						</div>
					</div>
					<div class="w-38 h-full flex-shrink flex flex-row justify-between">
						<div class="h-full w-10 p-2 flex justify-center items-center">
							<AiOutlineStar size={24} class="cursor-pointer text-gray-500" />
						</div>
						<div
							onClick={openReplyModal}
							class="h-full w-10 p-2 flex justify-center items-center"
						>
							<MdReply size={24} class="cursor-pointer text-gray-500" />
						</div>
						<div class="h-full w-10 p-2 flex justify-center items-center">
							<BsThreeDotsVertical
								size={20}
								class="cursor-pointer text-gray-500"
							/>
						</div>
					</div>
				</div>
				<div class="w-full flex flex-row justify-between items-center">
					<div class="w-16 mr-2 flex-shrink"></div>
					<div class="flex-1  text-xs leading-5 pr-8">{mail.content}</div>
					<div class="w-38 h-full flex-shrink flex flex-row justify-between"></div>
				</div>

				{/* reply modal */}
				{isOpenReply && (
					<div class="w-full h-full py-4 flex flex-row justify-start ">
						<div class="w-16 mr-2 h-full flex-shrink flex justify-center">
							<img
								src={current_user.photoUrl}
								width={45}
								height={45}
								class="object-contain rounded-full border border-gray-200"
								alt="Picture of the author"
							/>
						</div>
						<div class="flex-1 h-full p-4 flex flex-col border border-gray-200 rounded-md shadow-lg justify-start relative">
							<div class="h-6 text-gray-500 text-xs">
								받는 사람 :{" "}
								{userObjs[mail.sender].email === current_user.email
									? userObjs[mail.receiver].name +
									  " (" +
									  userObjs[mail.receiver].email +
									  ")"
									: userObjs[mail.sender].name +
									  " (" +
									  userObjs[mail.sender].email +
									  ")"}
							</div>
							<textarea
								ref={replyRef}
								name="contentValue"
								name="content"
								class="w-full pt-2 pb-4 text-sm resize-none outline-none h-60 whitespace-normal"
								value={replyContent.content}
								onChange={(e) => handleChange(e, "content")}
							/>
							<div class="px-4  flex flex-row justify-between">
								<button
									onClick={sendReply}
									class="px-4 py-1.5 rounded-md text-sm cursor-pointer bg-blue-600 text-white"
								>
									보내기
								</button>
								<div>
									<IoMdTrash
										size={24}
										onClick={closeReplyModal}
										class="z-10 m-1.5 mx-2 ml-6 cursor-pointer text-gray-500"
									/>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			{/* 토글 */}
			{/* <div class="w-full h-auto flex flex-col justify-center items-center border-b border-gray-200"></div> */}
		</>
	);
};

export default MailComponent;
