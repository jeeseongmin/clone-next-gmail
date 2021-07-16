export const SET_THREAD_LIST = "SET_THREAD_LIST";

export const setThreadList = (threads) => ({
	type: SET_THREAD_LIST,
	payload: threads,
});

const initialState = {
	threadList: [],
};

const thread = (state = initialState, action) => {
	switch (action.type) {
		case SET_THREAD_LIST: {
			return {
				...state,
				threadList : action.payload,
			}
		}
		default:
			return state;
	}
};
export default thread;
