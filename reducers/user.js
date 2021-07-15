export const SET_USER = "SET_USER";

export const setUser = () => ({
	type: SET_USER,
});

const initialState = {
	uuid: null,
	email: null,
	name: null,
	starred: [],
	Temp: [],
	NotRead: [],
};

const reducer = (state = initialState, action) => {
	// 리듀서
	switch (action.type) {
		case SET_USER:
			return state;
		default:
			return state;
	}
};

export default reducer;
