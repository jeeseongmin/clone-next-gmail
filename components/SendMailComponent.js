import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaRegWindowMinimize } from "react-icons/fa";
import { IoMdClose, IoMdTrash } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import firebase from "../common/firebase";
import { addThread } from "../reducers/thread";
import { addMail } from "../reducers/mail";
import { editUser, addUser } from "../reducers/user";
import { setSendMail } from "../reducers/modal";
import { editMythread, editKeys } from "../reducers/user";

const SendMailComponent = () => {
	const [mail, setMail] = useState({
		title: "",
		receiver: "",
		content: "",
	});
	const dispatch = useDispatch();
	const user = useSelector((state) => state.current_user);
	const userList = useSelector((state) => state.user.objs);

	const mailList = useSelector((state) => state.mail);

	const handleChange = (e, key) => {
		const cp = { ...mail };
		cp[key] = e.target.value;
		setMail(cp);
	};

	const closeModal = () => {
		setMail({
			title: "",
			receiver: "",
			content: "",
		});
		dispatch(setSendMail("close"));
	};

	const sendMail = async function () {
		if (mail.receiver === "" || mail.title === "" || mail.content === "") {
			alert("정보를 입력해주세요.");
		} else {
			// 0. user 생성
			const receiver = {
				uuid: uuidv4(),
				email: mail.receiver,
				name: "unknown",
				photoUrl: "https://i.stack.imgur.com/l60Hf.png",
				threadKeys: [],
				myThread: {},
				temp: [],
			};
			dispatch(addUser(receiver.uuid, receiver));
			// 1. mail object 생성
			const mail_payload = {
				uuid: uuidv4(),
				sender: user.uuid,
				receiver: receiver.uuid,
				title: mail.title,
				content: mail.content,
				created: new Date(),
				threadId: uuidv4(),
			};
			dispatch(addMail(mail_payload.uuid, mail_payload));
			// // 2. thread 생성
			const thread_payload = {
				uuid: mail_payload.threadId,
				mailList: [mail_payload.uuid],
			};
			dispatch(addThread(thread_payload.uuid, thread_payload));

			// 3. user에 해당 thread 공간 만들기
			var newPayload1 = { ...userList[user.uuid].myThread };
			newPayload1[thread_payload.uuid] = {
				sent: [mail_payload.uuid],
				received: [],
				starred: [],
				deleted: [],
				isRead: true,
			};
			var newPayload2 = {};
			newPayload2[thread_payload.uuid] = {
				sent: [],
				received: [mail_payload.uuid],
				starred: [],
				deleted: [],
				isRead: false,
			};
			dispatch(
				editKeys(user.uuid, [
					...userList[user.uuid].threadKeys,
					thread_payload.uuid,
				])
			);
			dispatch(editKeys(receiver.uuid, [thread_payload.uuid]));
			dispatch(editMythread(user.uuid, newPayload1));
			dispatch(editMythread(receiver.uuid, newPayload2));
			closeModal();
			// console.log(userList);
			alert("메일이 전송되었습니다!");
		}
	};

	return (
		<div class="absolute flex flex-col shadow-xl bottom-0 right-11 w-1/3 h-2/3 rounded-t-xl border border-gray-300">
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
