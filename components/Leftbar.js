import React, { useState } from "react";
import Image from "next/image";
import plus from "../public/image/plus.png";
import {
	IoMdMailOpen,
	IoMdSend,
	IoMdDocument,
	IoMdTrash,
} from "react-icons/io";
import { MdSend } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setIsLongSide } from "../reducers/modal";
import { setSendMail } from "../reducers/modal";

const Leftbar = () => {
	const [clickMenu, setClickMenu] = useState(1);
	const [hoverMenu, setHoverMenu] = useState(0);

	const dispatch = useDispatch();
	const isLongSide = useSelector((state) => state.modal.isLongSide);

	const onClickMenu = (num) => {
		setClickMenu(num);
	};

	const onHoverMenu = (num) => {
		setHoverMenu(num);
	};

	return (
		<div
			class={
				"  flex flex-col items-start flex-shrink-0 " +
				(isLongSide ? "w-64 mr-2 pr-4" : "w-19 relative mr-1")
			}
		>
			<div class="my-3 mb-8 ml-1">
				<div
                onClick={() => dispatch(setSendMail("open"))}
					class={
						"w-auto flex flex-row ml-1 pl-2 py-2 justify-center items-center cursor-pointer shadow-lg rounded-full border border-gray-300 hover:shadow-2xl " +
						(isLongSide ? "pr-4" : "pr-2")
					}
				>
					<Image
						src={plus}
						width={35}
						height={35}
						class="object-contain"
						alt="Picture of the author"
					/>
					{isLongSide && <button class="ml-4 font-medium">편지쓰기</button>}
				</div>
			</div>
			<div class="w-full flex flex-col pb-4 border-b-2 border-gray-200">
				<div
					onClick={() => onClickMenu(1)}
					onMouseOver={() => onHoverMenu(1)}
					onMouseOut={() => onHoverMenu(0)}
					class={"flex flex-row mb-1 items-center cursor-pointer relative "}
				>
					<div
						class={
							"absolute bottom-0 left-0 h-10 w-56 z-0 origin-left " +
							(clickMenu === 1
								? " bg-red-100 "
								: hoverMenu === 1
								? " bg-gray-200 "
								: "") +
							(isLongSide
								? "rounded-r-full"
								: " translate-x-3.5 w-11 rounded-full ")
						}
					></div>
					<IoMdMailOpen
						size={24}
						class={
							"z-10 m-1.5 mx-2 ml-6 " +
							(clickMenu === 1 ? "text-red-500" : "text-gray-500")
						}
					/>
					{isLongSide && (
						<button
							class={
								"z-10 ml-4 " + (clickMenu === 1 ? "font-bold text-red-500" : "")
							}
						>
							받은편지함
						</button>
					)}
				</div>
				<div
					onClick={() => onClickMenu(2)}
					onMouseOver={() => onHoverMenu(2)}
					onMouseOut={() => onHoverMenu(0)}
					class={"flex flex-row mb-1 items-center cursor-pointer relative  "}
				>
					<div
						class={
							"absolute bottom-0 left-0 h-10 w-56 z-0 origin-left " +
							(clickMenu === 2
								? "bg-gray-200 "
								: hoverMenu === 2
								? " bg-gray-200 "
								: "") +
							(isLongSide
								? "rounded-r-full"
								: " translate-x-3.5 w-11 rounded-full ")
						}
					></div>
					<AiFillStar size={24} class="z-10 m-1.5 mx-2 ml-6 text-gray-500" />
					{isLongSide && (
						<button class={"z-10 ml-4 " + (clickMenu === 2 ? "font-bold" : "")}>
							별표편지함
						</button>
					)}
				</div>
				<div
					onClick={() => onClickMenu(3)}
					onMouseOver={() => onHoverMenu(3)}
					onMouseOut={() => onHoverMenu(0)}
					class={"flex flex-row mb-1 items-center cursor-pointer relative "}
				>
					<div
						class={
							"absolute bottom-0 left-0 h-10 w-56 z-0 origin-left " +
							(clickMenu === 3
								? "bg-gray-200 "
								: hoverMenu === 3
								? " bg-gray-200 "
								: "") +
							(isLongSide
								? "rounded-r-full"
								: " translate-x-3.5 w-11 rounded-full ")
						}
					></div>
					<MdSend size={24} class="z-10 m-1.5 mx-2 ml-6 text-gray-500" />
					{isLongSide && (
						<button class={"z-10 ml-4 " + (clickMenu === 3 ? "font-bold" : "")}>
							보낸편지함
						</button>
					)}
				</div>
				<div
					onClick={() => onClickMenu(4)}
					onMouseOver={() => onHoverMenu(4)}
					onMouseOut={() => onHoverMenu(0)}
					class={" flex flex-row mb-1 items-center cursor-pointer relative "}
				>
					<div
						class={
							"absolute bottom-0 left-0 h-10 w-56 z-0 origin-left " +
							(clickMenu === 4
								? "bg-gray-200 "
								: hoverMenu === 4
								? " bg-gray-200 "
								: "") +
							(isLongSide
								? "rounded-r-full"
								: " translate-x-3.5 w-11 rounded-full ")
						}
					></div>
					<IoMdDocument size={24} class="z-10 m-1.5 mx-2 ml-6 text-gray-500" />
					{isLongSide && (
						<button class={"z-10 ml-4 " + (clickMenu === 4 ? "font-bold" : "")}>
							임시보관함
						</button>
					)}
				</div>
				<div
					onClick={() => onClickMenu(5)}
					onMouseOver={() => onHoverMenu(5)}
					onMouseOut={() => onHoverMenu(0)}
					class={" flex flex-row mb-1 items-center cursor-pointer relative "}
				>
					<div
						class={
							"absolute bottom-0 left-0 h-10 w-56 z-0 origin-left " +
							(clickMenu === 5
								? "bg-gray-200 "
								: hoverMenu === 5
								? " bg-gray-200 "
								: "") +
							(isLongSide
								? "rounded-r-full"
								: " translate-x-3.5 w-11 rounded-full ")
						}
					></div>
					<IoMdTrash size={24} class="z-10 m-1.5 mx-2 ml-6 text-gray-500" />
					{isLongSide && (
						<button class={"z-10 ml-4 " + (clickMenu === 5 ? "font-bold" : "")}>
							휴지통
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Leftbar;
