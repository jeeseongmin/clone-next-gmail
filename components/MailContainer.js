import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReceivedList from "./ReceivedList";
import SentList from "./SentList";
import DeletedList from "./DeletedList";
import StarredList from "./StarredList";
import TempList from "./TempList";

const MailContainer = () => {
	const menuType = useSelector((state) => state.modal.menuType);
	// const current_user = useSelector((state) => state.user.current_user);
	// const user = useSelector((state) => state.user.objs[current_user.uuid]);

	if (menuType === "received") {
		return <ReceivedList />;
	} else if (menuType === "starred") {
		return <StarredList />;
	} else if (menuType === "sent") {
		return <SentList />;
	} else if (menuType === "temp") {
		return <TempList />;
	} else if (menuType === "deleted") {
		return <DeletedList />;
	} else {
		return <ReceivedList />;
	}
};

export default MailContainer;
