## Google Gmail Clone Project

- 해당 프로젝트는 Google의 Gmail을 클론한 프로젝트입니다.

- 기본 스택은 server side 없이 `redux`와 `next.js`로 설계하였습니다. (css는 `tailwind.css`)

## 프로젝트 정보

### 1. 실행

- `npm run dev` 명령어를 통해 실행

### 2. 페이지 구성

- **Login**
  ![캡처](https://user-images.githubusercontent.com/47960777/126595366-25bf7d34-aac7-4f50-810b-08f4a6a455c7.png)

  - 소셜 로그인을 구성했지만, 사기 사이트 위험때문에 임시 삭제 해놓은 상태입니다.
  - 현재는 `default user`의 정보로 로그인하게 되어있습니다.

- **Main**

  ![캡처](https://user-images.githubusercontent.com/47960777/126595352-68bfd0d1-f8d1-46e8-95f7-83dba61b55b5.png)

  - 기본 Gmail의 ui/ux를 그대로 clone해본 메인페이지입니다.
  - 행아웃 및 메일 검색은 구성하지 않은 상태입니다.

### 2. 기능

- 메일 작성
- 메일 삭제
- 메일 답장
- 메일 별표표시
-

### 3. redux 구조

## Co

## 디플로이

vercel + route 53을 통해 deploy하였습니다.

- 현재 clone-gmail.peration.org 라는 도메인을 구매 후 등록했지만, 사기 사이트 검사를 받아서 해당 도메인은 이용하지 못하는 상태입니다.
  그래서 다음의 vercel 가변 주소를 통해 확인할 수 있습니다.

  [clone 사이트 주소](https://clone-gmail-83n8hl8zo-jeeseongmin.vercel.app)

---

## 기능

0. 구글 소셜 로그인 (사이트 검증 기간 중 임시 삭제)
1. 메일 작성
2. 메일 삭제
3. 메일 답장
4.
