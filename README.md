## 바로가기
- [라이브러리 버전](#라이브러리-버전)
- [주요 기능](#주요-기능)
- [실행 방법](#실행-방법)

## 라이브러리 버전
- Next.js : 15.3.1
- React : 19.1.0
- Zustand : 5.0.4
- 그 외 DatePicker, Nivo, GoogleMap API, Axios, Tailwind CSS를 사용하고 있습니다.

## 주요 기능
1. 통계 대시보드 페이지 : 날짜를 선택하면 해당 일자의 이벤트와 관련된 통계를 나타냅니다.
<img width="1880" height="854" alt="image" src="https://github.com/user-attachments/assets/0a31388d-15b8-437c-8b4b-0273a10af81e" />

2. 객체 조회 페이지 : 기간을 선택하고 이동하는 객체(사람)을 클릭하면 해당 객체의 동선을 나타냅니다.
<img width="2877" height="1270" alt="image" src="https://github.com/user-attachments/assets/09377cac-69c1-4c69-a0e9-108c369bbe5d" />

3. 이벤트 조회 페이지 : 기간을 선택하여 해당 기간동안 발생한 이벤트를 조회하며, 해당 이벤트 클릭 시 이벤트의 상세 정보를 조회합니다.
<img width="1894" height="852" alt="image" src="https://github.com/user-attachments/assets/5ab5139e-97e5-464f-b552-d06ef01e1163" />

4. 카메라 조회 페이지 : 현재 데이터베이스에 존재하는 카메라의 위치를 구글맵에 마커 형태로 나타내며, 마커 클릭 시 카메라에 발생한 이벤트 정보를 조회할 수 있습니다. 이벤트 정보 클릭 시 이벤트의 상세 페이지로 이동합니다.
<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/f09a23f5-db22-4319-862f-86f4dfd9be35" />
<img width="1884" height="802" alt="image" src="https://github.com/user-attachments/assets/5ef6cb44-bdc1-4bf7-a0b1-78d9e4db5d97" />

5. 보고서 생성 페이지 : 보고서를 생성할 객체 목록을 선택 후 보고서 생성 버튼을 클릭하면 객체의 정보, 동선 및 작성자가 포함된 hwp 파일이 생성됩니다.
<img width="1919" height="716" alt="image" src="https://github.com/user-attachments/assets/35da8c12-030d-48b1-aa94-79d2ab10b97c" />

6. 챗봇 모달 : 오른쪽 위의 ? 버튼을 클릭하여 챗봇 모달 창을 불러올 수 있으며, 자연어 형태로 원하는 데이터를 조회할 수 있습니다. (현재 API 미연결)
<img width="1890" height="855" alt="image" src="https://github.com/user-attachments/assets/bc70edda-3a49-48de-ad93-7e12a36d7adb" />

## 실행 방법
먼저 환경 변수를 지정하여야 합니다. 디렉토리의 최상위에 ".env.local" 파일을 생성하고, 해당 환경 변수의 값을 알맞게 추가합니다.

```
#.env.local
NEXT_PUBLIC_BACKEND_URL={백엔드 서버의 주소}
NEXT_PUBLIC_GOOGLE_MAP_API_KEY={GOOGLE MAP API 키}
```

그 후 Dockerfile을 기반으로 Docker Image를 생성합니다.

```
>> docker build -t {이미지 이름} .
```

마지막으로 Docker Container에 해당 이미지를 불러와 실행합니다. 이때 포트 번호는 상황에 맞게 변경하시면 됩니다. 저는 3000번 포트로 접속하였습니다.

```
>> docker run -p 3000:3000 {이미지 이름}
```
