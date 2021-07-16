import { v4 as uuidv4 } from "uuid";
import firebase from "../common/firebase";

const mailList = {
	uuid: uuidv4(),
	sender: "21500706@handong.edu",
	receiver: uuidv4(),
	title: "uuid를 이용한 고유 값 생성 방법",
	content: "uuidv4() 함수를 사용하여 랜덤한 uuid를 불러옵니다.",
	created: firebase.firestore.Timestamp.now().seconds,
	threadUuid: uuidv4(),
	index: 1,
};
