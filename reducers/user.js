export const SET_USER = "SET_USER";

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const initialState = {
	uuid: null,
	email: null,
	name: null,
	starred: [],
	Temp: [],
	NotRead: [],
	photoUrl: null,
};

const user = (state = initialState, action) => {
	// 리듀서
	switch (action.type) {
		case SET_USER:
			return action.payload;
		default:
			return state;
	}
};

export default user;
