export const SET_UUID = "SET_UUID";
export const SET_EMAIL = "SET_EMAIL";
export const SET_NAME = "SET_NAME";
export const RESET_CURRENTUSER = "RESET_CURRENTUSER";
export const SET_PHOTO_URL = "SET_PHOTO_URL";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = (user) => ({
	type: SET_CURRENT_USER,
	payload: user,
});
export const setPhotoUrl = (photoUrl) => ({
	type: SET_PHOTO_URL,
	payload: photoUrl,
});

export const setEmail = (email) => ({
	type: SET_EMAIL,
	payload: email,
});

export const setUuid = (uid) => ({
	type: SET_UUID,
	payload: uid,
});

export const setName = (name) => ({
	type: SET_NAME,
	payload: name,
});

export const resetCurrentUser = (user) => ({
	type: RESET_CURRENTUSER,
	payload: user,
});

const initialState = {
	uuid: "",
	email: "",
	name: "",
	photoUrl: "",
};

const current_user = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER: {
			console.log(action.payload);
			return action.payload;
		}

		case SET_UUID: {
			return {
				...state,
				uuid: action.payload,
			};
		}

		case SET_PHOTO_URL: {
			return {
				...state,
				photoUrl: action.payload,
			};
		}

		case SET_EMAIL: {
			return {
				...state,
				email: action.payload,
			};
		}
		case SET_NAME: {
			return {
				...state,
				name: action.payload,
			};
		}
		case RESET_CURRENTUSER: {
			return {
				uuid: "",
				email: "",
				name: "",
				photoUrl: "",
			};
		}
		default:
			return state;
	}
};

export default current_user;
