import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { MdRefresh, MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { FaTrashRestoreAlt, FaMailBulk } from "react-icons/fa";
import { editMythread } from "../reducers/user";
import MailComponent from "./MailComponent";
import {
	IoMdMailOpen,
	IoMdSend,
	IoMdDocument,
	IoMdTrash,
} from "react-icons/io";

const ThreadComponent = (props) => {
	try {
		const thread = props.thread;
		const [mailList, setMailList] = useState([]);

		const dispatch = useDispatch();
		const current_user = useSelector((state) => state.current_user);
		const userList = useSelector((state) => state.user.objs);
		const mailListObj = useSelector((state) => state.thread.objs);
		const menuType = useSelector((state) => state.modal.menuType);
		const mailObjs = useSelector((state) => state.mail.objs);
		const recentMail = mailListObj[thread].mailList[0];
		const mailTitle = mailObjs[recentMail].title;
		const user = userList[current_user.uuid];
		const myThread = user.myThread;
		const deletedList = myThread[thread].deleted;
		useEffect(() => {
			onReadThread();
			sortList();
		}, []);

		useEffect(() => {
			sortList();
		}, [mailListObj[thread]]);

		// 메일들을 created 순서대로 정렬
		const sortList = () => {
			if (menuType === "deleted") {
				const cp = mailListObj[thread].mailList;
				const notDeletedCp = cp.filter(function (element, index) {
					console.log(element, index);
					return deletedList.includes(element);
				});
				setMailList(notDeletedCp);
			} else {
				console.log(mailListObj[thread]);
				const cp = mailListObj[thread].mailList;
				const notDeletedCp = cp.filter(function (element, index) {
					console.log(element, index);
					return !deletedList.includes(element);
				});
				setMailList(notDeletedCp);
			}
		};

		const onDeleteThread = () => {
			const cp = { ...myThread };
			const allList = mailListObj[thread].mailList;

			const _deletedList = [...allList, ...cp[thread].deleted];
			// if (!_deletedList.includes(thread)) {
			// 	_deletedList.push(mailId);
			// }
			cp[thread].deleted = _deletedList;
			dispatch(editMythread(thread, cp));
			Router.back();
		};

		// 휴지통에서 복구
		const onRestoreThread = () => {
			const cp = { ...myThread };
			const _deletedList = [];
			cp[thread].deleted = _deletedList;
			dispatch(editMythread(thread, cp));
			Router.back();
		};

		// 읽음처리
		const onReadThread = () => {
			const cp = { ...myThread };
			console.log(cp, thread);
			cp[thread].isRead = true;
			dispatch(editMythread(thread, cp));
		};

		// 안읽음처리
		const onNotReadThread = () => {
			const cp = { ...myThread };
			console.log(cp, thread);
			cp[thread].isRead = false;
			dispatch(editMythread(thread, cp));
			Router.back();
		};
		return (
			<div class="flex-1 w-full h-full flex flex-col">
				<div class="w-full h-10 px-2 flex-grow-0 flex-shrink-0 flex flex-row justify-start items-center border-b border-gray-200">
					<div
						onClick={() => Router.back()}
						class="h-full w-10 p-2 mr-6 flex cursor-pointer rounded-full justify-center items-center hover:bg-gray-100"
					>
						<IoArrowBack
							title="받은 편지함으로 돌아가기"
							size={24}
							class="text-gray-500"
						/>
					</div>
					<div
						onClick={onNotReadThread}
						class="h-full w-10 p-2 flex cursor-pointer rounded-full justify-center items-center hover:bg-gray-100"
					>
						<FaMailBulk
							size={24}
							title="읽지 않은 상태로 표시"
							class="text-gray-500"
						/>
					</div>

					{menuType !== "deleted" && (
						<div
							onClick={onDeleteThread}
							class="h-full w-10 p-2 flex cursor-pointer rounded-full justify-center items-center hover:bg-gray-100"
						>
							<IoMdTrash size={24} title="삭제" class="text-gray-500" />
						</div>
					)}
					{menuType === "deleted" && (
						<div
							onClick={onRestoreThread}
							class="h-full w-10 p-2 flex cursor-pointer rounded-full justify-center items-center hover:bg-gray-100"
						>
							<FaTrashRestoreAlt size={24} title="복구" class="text-gray-500" />
						</div>
					)}
				</div>
				<div class="w-full h-auto px-4 py-4 flex flex-row justify-start items-center">
					<div class="w-16 mr-2 h-full flex-shrink flex justify-center "></div>
					<h3 class="text-lg font-medium">{mailTitle}</h3>
				</div>
				{mailList.map((element, index) => {
					var open = false;
					if (index === mailList.length - 1) open = true;
					return <MailComponent key={element} mailId={element} open={open} />;
				})}
			</div>
		);
	} catch (error) {
		alert("세션이 만료되었습니다!");
		Router.push("/");
		return 0;
	}
	return <div></div>;
};

export default ThreadComponent;
