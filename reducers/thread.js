export const SET_THREAD = "SET_THREAD";
export const ADD_THREAD = "ADD_THREAD";
export const RESET_THREAD = "RESET_THREAD";

export const setThread = (threads) => ({
	type: SET_THREAD,
	data: threads,
});

export const addThread = (key, threads) => ({
	type: ADD_THREAD,
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
		// 쓰레드 초기 세팅
		case SET_THREAD: {
			const keys = data.map((obj) => obj.uuid);
			const objs = {};
			const _objs = data.map((obj) => (objs[obj.uuid] = obj));

			return {
				keys: keys,
				objs: objs,
			};
		}
		// 쓰레드 추가 및 수정
		case ADD_THREAD: {
			const { key, threads } = data;
			const keys = state.keys;
			// 기존에 없다면 새로 추가
			if (!keys.includes(key)) {
				keys.push(key);
				const objs = { ...state.objs };
				objs[key] = threads;
				return {
					keys: [...keys],
					objs: {
						...objs,
					},
				};
			}
			// 기존에 있을 때에 덮어 씌우기
			else {
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
