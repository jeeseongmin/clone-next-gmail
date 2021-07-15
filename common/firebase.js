import firebase from "firebase";
import config from "../config/firebase";

// 초기 한번만 initialze 해줘야 하기 때문

/*
    고급스럽게 처리를 하려면, firebase.initializeApp 이라는 것은 구글 서버에 한번 try를 할 때마다 서버 통신이 일어난다.
    firebase의 특성을 이용해, firebase.app을 사용하면 된다.
    그래서 초기화가 되어있지 않은 경우에는 에러가 나도록 만든다.
    firebase 앱에 접근을 해보고 초기화가 되어있으면 바로 사용하고, 되어있지 않으면 초기화를 한번 하고 사용하게끔 만든다.
*/
try {
	firebase.app();
} catch (error) {
	firebase.initializeApp(config);
}

export default firebase;
