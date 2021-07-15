import { combineReducers } from "redux";
import user from "./user";
import mail from "./mail";
import thread from "./thread";
import modal from "./modal";

export const USER_LOGOUT = "USER_LOGOUT";

const appReducer = combineReducers({
	user,
	mail,
	thread,
	modal,
});

const rootReducer = (state, action) => {
	if (action.type === USER_LOGOUT) {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;
