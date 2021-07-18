export const SET_THREAD = "SET_THREAD";
export const ADD_THREAD = "ADD_THREAD";
export const EDIT_THREAD = "EDIT_THREAD";
export const RESET_THREAD = "RESET_THREAD";

export const setThread = (threads) => ({
	type: SET_THREAD,
	data: threads,
});

export const addThread = (key, threads) => ({
	type: ADD_THREAD,
	data: { key, threads },
});

export const editThread = (key, threads) => ({
	type: EDIT_THREAD,
	data: { key, threads },
});

export const resetThread = (threads) => ({
	type: RESET_THREAD,
	data: threads,
});

const initialState = {
	MediaKeySession: [],
	objs: {},
};

const thread = (state = initialState, action) => {
	const { type, data } = action;
	switch (type) {
		case SET_THREAD: {
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
		case ADD_THREAD: {
			const { key, threads } = data;
			const keys = state.keys;
			if (!keys.includes(key)) {
				keys.push(key);
			}

			const tempObjs = {};
			tempObjs[key] = threads;

			const objs = { ...state.objsm, ...tempObjs };
			return { ...state, keys, objs };
		}
		case EDIT_THREAD: {
			const { key, threads } = data;
			return {
				...state,
				objs: {
					...state.objs,
					[key]: { ...state.objs[key], threads },
				},
			};
		}
		case RESET_THREAD: {
			return {
				key: [],
				objs: {},
			};
		}
		default:
			return state;
	}
};
export default thread;
