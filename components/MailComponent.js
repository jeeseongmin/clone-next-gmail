import React, { useState, useRef, useEffect } from "react";
import { MdReply } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { addThread } from "../reducers/thread";
import { addMail } from "../reducers/mail";
import { addUser, editMythread } from "../reducers/user";
import { v4 as uuidv4 } from "uuid";

const MailComponent = (props) => {
	const dispatch = useDispatch();
	const [isOpenReply, setIsOpenReply] = useState(false);
	const open = props.open;

	const closeReplyModal = () => {
		setIsOpenReply(false);
		setReplyContent({
			title: "",
			receiver: "",
			content: "",
		});
	};
	
	const current_user = useSelector((state) => state.current_user);
	const openReplyModal = () => {
		setIsOpenReply(true);
		setReplyContent({
			title: "",
			// 이 메일의 보내는 사람이 나였으면, 나한테 보내면 안되니깐, 받는 사람한테 줘야함.
			receiver: mail.sender === current_user.uuid ? mail.receiver : mail.sender,
			content: "",
		});
	};

	// 컴포넌트 클릭 시에 줄어들고 늘어나는 것
	const [toggle, setToggle] = useState(false);

	const mailId = props.mailId;
	const replyRef = useRef(null);
	const mailObjs = useSelector((state) => state.mail.objs);
	const userObjs = useSelector((state) => state.user.objs);
	console.log(userObjs);
	const threadObjs = useSelector((state) => state.thread.objs);
	const mail = mailObjs[mailId];
	console.log(mail);
	const type = mail.receiver === current_user.uuid ? "received" : "sent";

	const starredList =
		userObjs[current_user.uuid].myThread[mail.threadId].starred;
	const isStarred = starredList.includes(mailId);

	const [replyContent, setReplyContent] = useState({
		title: "",
		receiver: mail.sender === current_user ? mail.receiver : mail.sender,
		content: "",
	});

	const myThread = userObjs[current_user.uuid].myThread;

	/* 메일 별 날짜 계산 */
	var date = new Date(mail.created);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const time =
		hour * 1 < 13
			? "오전 " + hour * 1 + ":" + minute
			: "오후 " + (hour * 1 - 12) + ":" + minute;
	const dateToText = month + "월 " + day + "일 " + time;
	const dateToText_toggle = year + ". " + month + ". " + day + ". " + time;

	// 열려있는 것 분류하기.
	useEffect(() => {
		if (open) {
			setToggle(open);
		} else if (starredList.includes(mailId)) {
			setToggle(true);
		}
	}, []);

	const handleChange = (e, key) => {
		const cp = { ...replyContent };
		cp[key] = e.target.value;
		setReplyContent(cp);
	};

	// 메일 리스트에서 별표편지 toggle
	const onClickStar = () => {
		// 없애기
		const thread = mail.threadId;
		if (isStarred) {
			const cp = { ...myThread };
			const _starredList = cp[thread].starred.filter(function (element, index) {
				return element !== mailId;
			});
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

	const sendReply = async function () {
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
			console.log("receiver", receiver);
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
			// 보내는 사람의 myThread 구성
			var newPayload1 = userObjs[current_user.uuid].myThread;
			newPayload1[thread_payload.uuid].sent.push(mail_payload.uuid);
			newPayload1[thread_payload.uuid].isRead = true;

			// 받는 사람의 myThread 구성
			var newPayload2 = userObjs[receiver.uuid].myThread;
			newPayload2[thread_payload.uuid].received.push(mail_payload.uuid);
			newPayload2[thread_payload.uuid].isRead = false;

			dispatch(editMythread(current_user.uuid, newPayload1));
			dispatch(editMythread(receiver.uuid, newPayload2));

			closeReplyModal();
		}
	};

	return (
		<>
			{/* 토글 1 */}
			{toggle && (
				<div class="w-full h-auto px-4 pb-4 flex-growflex flex-col justify-center items-center border-b border-gray-200">
					<div class=" cursor-pointer w-full py-4 flex flex-row justify-between items-center">
						<div
							onClick={() => setToggle(false)}
							class="w-16 mr-2 h-full flex-shrink flex justify-center"
						>
							<img
								src={userObjs[mail.sender].photoUrl}
								width={45}
								height={45}
								class="object-contain rounded-full border border-gray-200"
								alt="Picture of the author"
							/>
						</div>
						<div
							onClick={() => setToggle(false)}
							class="flex-1 h-full flex flex-row justify-between items-center"
						>
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
									<p class="text-xs">{userObjs[mail.receiver].email}에게</p>
								</div>
							)}
							<div class="h-full w-48 flex flex-col items-right justify-right text-right">
								<p class="text-xs">{dateToText}</p>
							</div>
						</div>
						<div class="w-38 h-full flex-shrink flex flex-row justify-between">
							<div
								onClick={onClickStar}
								class="h-full w-10 p-2 flex justify-center items-center rounded-full hover:bg-gray-200"
							>
								{isStarred ? (
									<AiFillStar size={24} class="text-yellow-300" />
								) : (
									<AiOutlineStar
										size={24}
										class="cursor-pointer text-gray-500"
									/>
								)}
							</div>
							<div
								onClick={openReplyModal}
								class="h-full w-10 p-2 flex justify-center items-center rounded-full hover:bg-gray-200"
							>
								<MdReply size={24} class="cursor-pointer text-gray-500" />
							</div>
							<div class="h-full w-10 p-2 flex justify-center items-center rounded-full hover:bg-gray-200">
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
									{userObjs[mail.receiver].email === current_user.email
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
										class="px-4 rounded-md text-sm cursor-pointer bg-blue-600 text-white"
									>
										보내기
									</button>
									<div class="p-2 hover:bg-gray-200">
										<IoMdTrash
											size={24}
											onClick={closeReplyModal}
											class=" cursor-pointer text-gray-500"
										/>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			)}

			{/* 토글 */}
			{!toggle && (
				<div class="flex-1 w-full cursor-pointer h-auto px-4 flex flex-col justify-center items-center border-b border-gray-200">
					<div class="w-full pt-4 flex flex-row justify-between items-center">
						<div
							onClick={() => setToggle(true)}
							class="w-16 mr-2 h-full flex-shrink flex justify-center"
						>
							<img
								src={userObjs[mail.sender].photoUrl}
								width={45}
								height={45}
								class="object-contain rounded-full border border-gray-200"
								alt="Picture of the author"
							/>
						</div>
						<div
							onClick={() => setToggle(true)}
							class="flex-1  h-full flex flex-row justify-between items-center"
						>
							{type === "received" && (
								<div class="flex-1 flex h-full flex-col justify-start ">
									<p class="font-bold">{userObjs[mail.sender].email}</p>
									<p class="flex-1 text-xs invisible">12312</p>
								</div>
							)}
							{type === "sent" && (
								<div class="flex-1 flex h-full flex-col justify-start">
									<p class="font-bold">
										{userObjs[current_user.uuid].name}
										<span class="font-normal text-xs">
											{" "}
											({userObjs[current_user.uuid].email})
										</span>
									</p>
									<p class="flex-1 text-xs invisible">123123</p>
								</div>
							)}
							<div class="w-72 h-full flex flex-col items-right justify-center text-right">
								<p class="text-xs">{dateToText_toggle}</p>
							</div>
						</div>
						<div class="w-30 h-full flex-shrink flex flex-row justify-between">
							<div
								onClick={onClickStar}
								class="h-full w-10 p-2 flex justify-center items-center rounded-full hover:bg-gray-200"
							>
								{isStarred ? (
									<AiFillStar size={24} class="text-yellow-300" />
								) : (
									<AiOutlineStar
										size={24}
										class="cursor-pointer text-gray-500"
									/>
								)}
							</div>
						</div>
					</div>
					<div class="w-full -mt-3 mb-8 flex flex-row justify-between items-center">
						<div class="w-16 mr-2 flex-shrink"></div>
						<div class="flex-1  text-xs leading-5 pr-8">{mail.content}</div>
						<div class="w-38 h-full flex-shrink flex flex-row justify-between"></div>
					</div>
				</div>
			)}
		</>
	);
};

export default MailComponent;
