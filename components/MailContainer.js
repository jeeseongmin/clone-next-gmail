import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReceivedList from "./ReceivedList";
import SentList from "./SentList";
import TrashList from "./TrashList";
import StarredList from "./StarredList";
import TempList from "./TempList";

const MailContainer = () => {
	const menuType = useSelector((state) => state.modal.menuType);
	// const current_user = useSelector((state) => state.user.current_user);
	// const user = useSelector((state) => state.user.objs[current_user.uuid]);

	if (menuType === "receive") {
		return <ReceivedList />;
	} else if (menuType === "star") {
		return <StarredList />;
	} else if (menuType === "send") {
		return <SentList />;
	} else if (menuType === "temp") {
		return <TempList />;
	} else if (menuType === "trash") {
		return <TrashList />;
	} else {
		return <ReceivedList />;
	}
};

export default MailContainer;
