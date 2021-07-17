import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaRegWindowMinimize } from "react-icons/fa";
import { IoMdClose, IoMdTrash } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import firebase from "../common/firebase";
import { setThreadList } from "../reducers/thread";
import { setMailList } from "../reducers/mail";
import { setSendMail } from "../reducers/modal";

const SendMailComponent = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const mailList = useSelector((state) => state.mail.mailList);
	const threadList = useSelector((state) => state.thread.threadList);
	console.log(mailList, threadList);

	const [mail, setMail] = useState({
		receiver: "",
		title: "",
		content: "",
	});

	const handleChange = (e, key) => {
		const cp = { ...mail };
		cp[key] = e.target.value;
		setMail(cp);
	};

	const closeModal = () => {
		const cp = {
			receiver: "",
			title: "",
			content: "",
		};
		setMail(cp);
		dispatch(setSendMail("close"));
		console.log("haha");
	};

	const sendMail = async function () {
		if (mail.receiver === "" || mail.title === "" || mail.content === "") {
			alert("정보를 입력해주세요.");
		} else {
			const cp_mail = [...mailList];
			console.log(cp_mail);
			const mail_payload = {
				uuid: uuidv4(),
				sender: user.email,
				receiver: mail.receiver,
				title: mail.title,
				content: mail.content,
				created: firebase.firestore.Timestamp.now().seconds,
				threadId: uuidv4(),
				index: 1,
			};
			cp_mail.push(mail_payload);
			console.log(cp_mail);
			dispatch(setMailList(cp_mail));
			const list = [];
			list.push(mail_payload.uuid);

			const thread_payload = {
				uuid: mail_payload.threadId,
				MailList: list,
			};

			const cp_thread = threadList;
			cp_thread.push(thread_payload);
			dispatch(setThreadList(cp_thread));

			console.log(mailList);
			console.log(threadList);
			alert("메일이 전송되었습니다!");
		}
	};

	return (
		<div class="absolute flex flex-col shadow-xl bottom-0 right-11 w-1/3 h-2/3 ">
			<div class="flex flex-row px-4 py-2 justify-between items-center rounded-t-xl bg-gray-800">
				<div class="text-gray-200">새 메일</div>
				<div class="flex flex-row text-gray-200">
					<FaRegWindowMinimize size={12} class="mx-4" />
					<IoMdClose onClick={closeModal} class="cursor-pointer" size={16} />
				</div>
			</div>
			<div class="w-full border-b-2 border-gray-200">
				<input
					type="text"
					name="receiver"
					class="w-full px-4 py-2 outline-none text-mg"
					placeholder="수신자"
					value={mail.receiver}
					onChange={(e) => handleChange(e, "receiver")}
				/>
			</div>
			<div class="w-full border-b-2 border-gray-200">
				<input
					type="text"
					name="title"
					class="w-full px-4 py-2 outline-none text-mg"
					placeholder="제목"
					value={mail.title}
					onChange={(e) => handleChange(e, "title")}
				/>
			</div>
			<div class="w-full h-full border-b-2 border-gray-200">
				<textarea
					name="contentValue"
					name="content"
					class="w-full px-4 py-4 resize-none outline-none h-80 whitespace-normal"
					value={mail.content}
					onChange={(e) => handleChange(e, "content")}
				/>
			</div>
			<div class="py-1 px-4 flex flex-row justify-between items-center ">
				<button
					onClick={sendMail}
					class="px-4 py-1.5 rounded-md cursor-pointer bg-blue-500 text-white"
				>
					보내기
				</button>
				<div>
					<IoMdTrash
						size={24}
						onClick={closeModal}
						class="z-10 m-1.5 mx-2 ml-6 cursor-pointer text-gray-500"
					/>
				</div>
			</div>
		</div>
	);
};

export default SendMailComponent;
