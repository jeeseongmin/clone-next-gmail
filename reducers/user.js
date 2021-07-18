export const SET_USER = "SET_USER";
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const RESET_USER = "RESET_USER";
export const EDIT_KEYS = "EDIT_KEYS";
export const EDIT_MYTHREAD = "EDIT_MYTHREAD";
export const EDIT_TEMP = "EDIT_TEMP";

export const setUser = (users) => ({
	type: SET_USER,
	data: users,
});

export const addUser = (key, users) => ({
	type: ADD_USER,
	data: { key, users },
});

export const editUser = (key, mailList) => ({
	type: EDIT_USER,
	data: { key, mailList },
});

export const resetUser = (users) => ({
	type: RESET_USER,
	data: users,
});

export const editKeys = (key, threadKeys) => ({
	type: EDIT_KEYS,
	data: { key, threadKeys },
});

export const editMythread = (key, myThread) => ({
	type: EDIT_MYTHREAD,
	data: { key, myThread },
});

export const editTemp = (temp) => ({
	type: EDIT_TEMP,
	data: temp,
});

const initialState = {
	keys: ["PuwwM38EJ7RziL9NRk2cwejibL83"],
	objs: {
		PuwwM38EJ7RziL9NRk2cwejibL83: {
			uuid: "PuwwM38EJ7RziL9NRk2cwejibL83",
			email: "21500706@handong.edu",
			name: "지성민",
			photoUrl:
				"https://lh3.googleusercontent.com/a-/AOh14Gi3enYZxCwL9Aoe1tBEQ-swzbGErjEN3aVnxnVN=s96-c",
			threadKeys: [],
			myThread: {},
			temp: [],
		},
	},
};

const user = (state = initialState, action) => {
	const { type, data } = action;
	switch (type) {
		case SET_USER: {
			const keys = data.map((obj) => (obj["key"] = obj.uuid));

			const objs = data.reduce(
				(nextObjs, obj) => ({
					...nextObjs,
					[obj["key"]]: obj,
				}),
				{}
			);
			return { ...state, keys, objs };
		}
		case ADD_USER: {
			const { key, users } = data;
			const keys = state.keys;
			if (!keys.includes(key)) {
				keys.push(key);
			}

			const tempObjs = {};
			tempObjs[key] = users;

			const objs = { ...state.objs, ...tempObjs };
			return { ...state, keys, objs };
		}
		case EDIT_USER: {
			const { key, mailList } = data;
			return {
				...state,
				objs: {
					...state.objs,
					[key]: { ...state.objs[key], mailList },
				},
			};
		}
		case EDIT_KEYS: {
			const { key, threadKeys } = data;
			return {
				...state,
				objs: {
					...state.objs,
					[key]: { ...state.objs[key], threadKeys },
				},
			};
		}
		case EDIT_MYTHREAD: {
			const { key, myThread } = data;
			return {
				...state,
				objs: {
					...state.objs,
					[key]: { ...state.objs[key], myThread },
				},
			};
		}
		case EDIT_TEMP: {
			const { key, temp } = data;
			return {
				...state,
				objs: {
					...state.objs,
					[key]: { ...state.objs[key], temp },
				},
			};
		}
		case RESET_USER: {
			return {
				keys: ["PuwwM38EJ7RziL9NRk2cwejibL83"],
				objs: {
					PuwwM38EJ7RziL9NRk2cwejibL83: {
						uuid: "PuwwM38EJ7RziL9NRk2cwejibL83",
						email: "21500706@handong.edu",
						name: "지성민",
						photoUrl:
							"https://lh3.googleusercontent.com/a-/AOh14Gi3enYZxCwL9Aoe1tBEQ-swzbGErjEN3aVnxnVN=s96-c",
						threadKeys: [],
						myThread: {},
						temp: [],
					},
				},
			};
		}
		default:
			return state;
	}
};
export default user;
