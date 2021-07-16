export const SET_MAIL_LIST = "SET_MAIL_LIST";

export const setMailList = (mailList) => ({
	type: SET_MAIL_LIST,
	payload: mailList,
});

const initialState = {
	mailList: [],
};

const mail = (state = initialState, action) => {
	switch (action.type) {
		case SET_MAIL_LIST: {
			return {
				...state,
				mailList: action.payload,
			};
		}
		default:
			return state;
	}
};

export default mail;
