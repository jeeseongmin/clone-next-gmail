export const SET_MAIL = "SET_MAIL";
export const ADD_MAIL = "ADD_MAIL";
export const EDIT_MAIL = "EDIT_MAIL";

export const setMail = (mailList) => ({
	type: SET_MAIL,
	data: mailList,
});

export const addMail = (mailList) => ({
	type: ADD_MAIL,
	data: mailList,
});

export const editMail = (mailList) => ({
	type: EDIT_MAIL,
	data: mailList,
});

const initialState = {
	key: [],
	objs: {},
};

const mail = (state = initialState, action) => {
	const { type, data } = action;
	switch (type) {
		// 유저 데이터 세팅
		case SET_MAIL: {
			// 인덱스 키 만들기
			const keys = data.map((obj) => (obj["key"] = obj.uuid));
			// 키 매칭해서 객체 만들기
			const objs = data.reduce(
				(nextObjs, obj) => ({
					...nextObjs,
					[obj["key"]]: obj,
				}),
				{}
			);
			return { ...state, keys, objs };
		}
		case ADD_MAIL: {
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
		case EDIT_MAIL: {
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

export default mail;
