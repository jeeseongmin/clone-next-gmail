export const SET_IS_LONG_SIDE = "SET_IS_LONG_SIDE";
export const SET_PROFILE_MODAL = "SET_PROFILE_MODAL";
export const SET_SEND_MAIL = "SET_SEND_MAIL";
export const RESET_MODAL = "RESET_MODAL";
export const SET_MENUTYPE = "SET_MENUTYPE";
export const SET_CHECK_THREAD = "SET_CHECK_THREAD";
export const ADD_CHECK_THREAD = "ADD_CHECK_THREAD";
export const DELETE_CHECK_THREAD = "DELETE_CHECK_THREAD";
export const RESET_CHECK_THREAD = "RESET_CHECK_THREAD";

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

export const resetModal = (sendMail) => ({
	type: RESET_MODAL,
	payload: sendMail,
});

// receive, star, send, temp, trash
export const setMenuType = (menuType) => ({
	type: SET_MENUTYPE,
	payload: menuType,
});

export const setCheckThread = (thread) => ({
	type: SET_CHECK_THREAD,
	payload: thread,
});

export const addCheckThread = (thread) => ({
	type: ADD_CHECK_THREAD,
	payload: thread,
});

export const resetCheckThread = (thread) => ({
	type: RESET_CHECK_THREAD,
	payload: thread,
});

export const deleteCheckThread = (thread) => ({
	type: DELETE_CHECK_THREAD,
	payload: thread,
});

const initialState = {
	isLongSIde: false,
	profileModal: false,
	sendMail: "close",
	menuType: "received",
	checkThread: [],
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
		case SET_MENUTYPE: {
			return {
				...state,
				menuType: action.payload,
			};
		}
		case SET_CHECK_THREAD: {
			return {
				...state,
				checkThread: action.payload,
			};
		}
		case RESET_CHECK_THREAD: {
			return {
				...state,
				checkThread: [],
			};
		}
		case ADD_CHECK_THREAD: {
			return {
				...state,
				checkThread: [...state.checkThread, action.payload],
			};
		}
		case DELETE_CHECK_THREAD: {
			const cp = state.checkThread;
			const new_cp = cp.filter(function (element, index) {
				return element !== action.payload;
			});
			return {
				...state,
				checkThread: new_cp,
			};
		}
		case RESET_MODAL: {
			return {
				isLongSIde: false,
				profileModal: false,
				sendMail: "close",
				menuType: "received",
				checkThread: [],
			};
		}
		default:
			return state;
	}
};

export default modal;
