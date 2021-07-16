export const SET_IS_LONG_SIDE = "SET_IS_LONG_SIDE";
export const SET_PROFILE_MODAL = "SET_PROFILE_MODAL";
export const SET_SEND_MAIL = "SET_SEND_MAIL";

export const setIsLongSide = (sidebar) => ({
	type: SET_IS_LONG_SIDE,
	payload: sidebar,
});

export const setProfileModal = (profileModal) => ({
	type: SET_PROFILE_MODAL,
	payload: profileModal,
});

export const setSendMail = (sendMail) => ({
	type: SET_SEND_MAIL,
	payload: sendMail,
});

const initialState = {
	isLongSIde: false,
	profileModal: false,
	sendMail: "close",
};

const modal = (state = initialState, action) => {
	// 리듀서
	switch (action.type) {
		case SET_PROFILE_MODAL: {
			return {
				...state,
				profileModal: action.payload,
			};
		}
		case SET_IS_LONG_SIDE: {
			return {
				...state,
				isLongSide: action.payload,
			};
		}
		case SET_SEND_MAIL: {
			return {
				...state,
				sendMail: action.payload,
			};
		}
		default:
			return state;
	}
};

export default modal;
