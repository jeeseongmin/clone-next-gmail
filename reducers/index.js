import { combineReducers } from "redux";
import user from "./user";
import mail from "./mail";
import thread from "./thread";

const appReducer = combineReducers({
	user,
	mail,
	thread,
});
const rootReducer = (state, action) => {
	return appReducer(state, action);
};
export default rootReducer;
