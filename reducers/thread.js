export const SET_THREAD = "SET_THREAD";
export const ADD_THREAD = "ADD_THREAD";
export const EDIT_THREAD = "EDIT_THREAD";

export const setThread = (threads) => ({
	type: SET_THREAD,
	data: threads,
});

export const addThread = (threads) => ({
	type: ADD_THREAD,
	data: threads,
});

export const editThread = (threads) => ({
	type: EDIT_THREAD,
	data: threads,
});

const initialState = {
	key: [],
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
			const keys = state.keys;
			keys.push(...data.map((obj) => (obj["key"] = obj.uuid)));
			const tempObjs = data.reduce(
				(nextObjs, obj) => ({
					...nextObjs,
					[obj["key"]]: obj,
				}),
				{}
			);
			const objs = { ...state.objs, ...tempObjs };
			return { ...state, keys, objs };
		}
		case EDIT_THREAD: {
			const { key, name } = data;
			return {
				...state,
				objs: {
					...state.objs,
					[key]: { ...state.objs[key], name },
				},
			};
		}
		default:
			return state;
	}
};
export default thread;
