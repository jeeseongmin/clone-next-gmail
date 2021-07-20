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
	keys: [],
	objs: {},
};

const thread = (state = initialState, action) => {
	const { type, data } = action;
	switch (type) {
		case SET_THREAD: {
			const keys = data.map((obj) => obj.uuid);
			const objs = {};
			const _objs = data.map((obj) => (objs[obj.uuid] = obj));

			return {
				keys: keys,
				objs: objs,
			};
		}
		case ADD_THREAD: {
			const { key, threads } = data;
			const keys = state.keys;
			// 기존에 없다면 새로 추가
			if (!keys.includes(key)) {
				console.log("없엉!");
				keys.push(key);
				const objs = { ...state.objs };
				console.log(objs);
				objs[key] = threads;
				return {
					keys: [...keys],
					objs: {
						...objs,
					},
				};
			} else {
				console.log("있엉!");
				const objs = { ...state.objs };
				objs[key] = {
					uuid: threads.uuid,
					mailList: [...state.objs[key].mailList, threads.mailList[0]],
				};
				return {
					keys: [...keys],
					objs: {
						...objs,
					},
				};
			}
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
