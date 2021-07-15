// export const SET_SIDE_BAR = "SET_SIDE_BAR";
export const SET_PROFILE_MODAL = "SET_PROFILE_MODAL";

// export const setSideBar = (sidebar) => ({
// 	type: SET_SIDE_BAR,
// 	payload: sidebar,
// });

export const setProfileModal = (profileModal) => ({
	type: SET_PROFILE_MODAL,
	payload: profileModal,
});

const initialState = {
	// sidebar: false,
	profileModal: false,
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
		// case SET_SIDE_BAR: {
		// 	return {
		// 		...state,
		// 		sidebar: action.payload,
		// 	};
		// }
		default:
			return state;
	}
};

export default modal;
