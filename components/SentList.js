import React from "react";
import Mail from "./Mail";
import { useDispatch, useSelector } from "react-redux";
import { MdRefresh, MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiArrowDropDownFill } from "react-icons/ri";
import { resetCheckThread } from "../reducers/modal";

const SentList = () => {
	const dispatch = useDispatch();
	const current_user = useSelector((state) => state.current_user);
	const user = useSelector((state) => state.user.objs[current_user.uuid]);
	const myThread = user.myThread;
	const keys = user.threadKeys;

	const onRefresh = () => {
		dispatch(resetCheckThread());
	};

	const sentList = keys.filter(function (element, index) {
		return myThread[element].sent.length > 0;
	});

	return (
		<div class="flex-1 h-full flex flex-col">
			<div class="w-full h-10 px-2 flex-grow-0 flex-shrink-0 flex flex-row justify-start items-center border-b-2 border-gray-100">
				<div class="h-full w-10 p-2 flex cursor-pointer rounded-full justify-center items-center hover:bg-gray-100">
					<MdCheckBoxOutlineBlank size={24} class="text-gray-700" />
				</div>
				<RiArrowDropDownFill
					size={24}
					class="cursor-pointer text-gray-700 -m-2 p-0"
				/>
				<div
					onClick={onRefresh}
					class="h-full w-10 ml-6 p-2 flex justify-center items-center"
				>
					<MdRefresh size={24} class="cursor-pointer text-gray-700" />
				</div>
				<div class="h-full w-10 p-2 flex justify-center items-center">
					<BsThreeDotsVertical size={18} class="cursor-pointer text-gray-700" />
				</div>
			</div>
			{sentList.reverse().map((element, index) => {
				return <Mail key={element} thread={element} type="sent" />;
			})}
			{sentList.length === 0 ? (
				<div class="w-full h-10 px-2 flex justify-center items-center border-b-2 border-gray-100">
					현재 보낸 메일이 없습니다.
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default SentList;
