## Google Gmail Clone Project

- 해당 프로젝트는 Google의 Gmail을 클론한 프로젝트입니다.

- 기본 스택은 server side 없이 `redux`와 `next.js`로 설계하였습니다. (css는 `tailwind.css`)

- Vercel deploy link : [링크](https://clone-gmail-b5v2tgcm6-jeeseongmin.vercel.app/)
- Route 53에서 구매한 도메인 link : [링크](https://clone-gmail.peration.org) - (현재 구글에서 사기성 사이트로 검토되어 수정 요청을 넣은 상황입니다.)

## 프로젝트 정보

### 1. 실행

- `npm run dev` 명령어를 통해 실행

### 2. 페이지 구성

- **Login**
  ![캡처](https://user-images.githubusercontent.com/47960777/126602774-0ba7d6e4-ec54-4458-a20d-08b9a221d9bb.png)

  - 소셜 로그인을 구성했지만, 사기 사이트 위험때문에 임시 삭제 해놓은 상태입니다.
  - 현재는 `default user`의 정보로 로그인하게 되어있습니다.

- **Main**

  ![캡처](https://user-images.githubusercontent.com/47960777/126602804-a455e03c-f631-40fd-a86c-627b7b28caf5.png)

  - 기본 Gmail의 ui/ux를 그대로 clone해본 메인페이지입니다.
  - 행아웃 및 메일 검색은 구성하지 않은 상태입니다.

### 3. 기능

- 메일 보기
  ![캡쳐](https://user-images.githubusercontent.com/47960777/126599789-1e1b59a9-3f62-498f-b4ea-34f22844ea3a.png)

- 메일 작성
  ![캡쳐](https://user-images.githubusercontent.com/47960777/126599817-f2e011a8-f86b-4c08-837e-481519b42e75.png)

- 메일 삭제
  ![캡쳐](https://user-images.githubusercontent.com/47960777/126599842-b02c9c30-c582-4129-8a63-7c159a5dd3c7.png)

- 메일 답장
  ![캡쳐](https://user-images.githubusercontent.com/47960777/126599876-a4405cf4-6a05-41be-9306-2a4b99fa836e.png)

  ![캡쳐](https://user-images.githubusercontent.com/47960777/126599917-d486c9e2-c5ff-4462-92f0-a3b49256e493.png)

- 메일 별표표시
  ![캡쳐](https://user-images.githubusercontent.com/47960777/126599941-7abbf5a7-6bd5-433e-9817-1bbe84a5e7a7.png)

### 4. redux 구조

redux는 모두 hash map 구조로, key를 통해 해당 key의 value들을 참조할 수 있는 방식으로 구현하였습니다.

#### **User**

(1) key ( array )

(2) objs ( hash map )

- key ( object )

  - uuid ( string ) : 유저 uuid
  - email ( string ) : 유저 email
  - name ( string ) : 유저 name
  - photoUrl ( string ) : 유저 profile image
  - threadKeys ( array ) : 유저의 thread key array
  - temp ( array ) : 작성중인 메일 임시보관 (구현 x)
  - myThread ( hash map ) : 유저의 thread hash map
    - key ( string ) : thread uuid)
      - sent ( array ) : 유저가 보낸 메일
      - received ( array ) : 유저가 받은 메일
      - starred ( array ) : 유저가 별표한 메일
      - deleted ( array ) : 유저가 삭제한 메일
      - isRead ( boolean ) : 해당 스레드의 읽음 여부

#### **Mail**

(1) key ( array )

(2) objs ( hash map )

- key ( object )

  - uuid ( string ) : 메일 uuid
  - sender ( string ) : 보낸 유저의 uuid
  - receiver ( string ) : 받는 유저의 uuid (원래는 array이지만, 현재 단일 메일 전송으로 구현 상태이기 때문에 string으로 정의)
  - title ( string ) : 메일 제목
  - content ( string ) : 메일 내용
  - created ( timestamp ) : 메일의 작성일
  - threadId ( string ) : 해당 메일이 속한 thread uuid

#### **Thread**

(1) key ( array )

(2) objs ( hash map )

- key ( object : thread uuid )
  - uuid ( string ) : 해당 thread uuid
  - mailList ( array ) : 해당 thread에 속한 mail list

### 5. 추가 예정 기능 (Demo 2)

- server side를 구현하여 실제 데이터베이스와 연동 예정
- 작성 중인 이메일을 임시 저장할 수 있는 기능
- 체크박스를 통한 다중 메일 삭제 및 읽음처리 기능
- 메일 및 유저 검색 기능
