## 바로가기
- [시스템 구조도](#시스템-구성도)
- [라이브러리 버전](#라이브러리-버전)
- [주요 기능](#주요-기능)
- [실행 방법](#실행-방법)

## 시스템 흐름도
<img width="1738" height="877" alt="image" src="https://github.com/user-attachments/assets/7aac58e3-aa7b-4e24-a064-3c156b92991b" />

- Video Receiver : 여러 대의 IP 카메라로부터 실시간으로 영상을 수집하여 일괄적으로 관리하는 하드웨어 또는 소프트웨어 장치입니다. 본 개발 환경에서는 한화테크윈의 QRS-430S NVR 장치 및 QNO-6082R IP 카메라를 도입했습니다.  각 카메라의 RTSP 스트림을 수신하며 필요 시 S3와 같은 Cloud 저장공간에서 영상을 저장할 수 있습니다. 이를 통해 다양한 브랜드 및 모델의 카메라를 통합적으로 관리하고 한 곳에서 영상 소스를 효율적으로 제어합니다.
- Stream Server : Video Receiver에서 RTSP 스트림 영상 데이터를 실시간으로 받아 내부 분석 파이프라인의 시작점이 됩니다. 전달받은 스트림 영상을 분석해 사람 객체 인식, ReID 식별, VLM을 통한 객체 특징의 텍스트 변환, DB 저장을 수행합니다. 영상 처리 이벤트는 Kafka 기반 메시지 큐를 활용해 비동기적으로 분산 처리되며, 이를 통해 다수의 카메라에서 발생하는 실시간 데이터의 부하를 효과적으로 분산 및 관리할 수 있습니다.
- Database : 영상 분석 결과를 저장하는 공간으로, 객체의 Feature Vector를 저장하는 Vector Database로 Faiss DB를, RDBMS로 PostgreSQL을 사용합니다.
- Client : 관리자가 데이터베이스에 저장된 분석 결과와 통계 정보를 손쉽게 조회 및 모니터링할 수 있는 웹 인터페이스입니다. 
- Backend : 데이터베이스에 저장된 각종 객체 정보 및 분석 결과를 가공해 외부 서비스로 제공합니다.

이 구조를 통해 실시간 영상 수집부터 분석, 데이터 저장, 관리자 시각화에 이르는 통합 관리·분석 시스템이 구현됩니다.

## 라이브러리 버전
- Next.js : 15.3.1
- React : 19.1.0
- Zustand : 5.0.4
- 그 외 DatePicker, Nivo, GoogleMap API, Axios, Tailwind CSS를 사용하고 있습니다.

## 주요 기능
1. 통계 대시보드 페이지 : 날짜를 선택하면 해당 일자의 이벤트와 관련된 통계를 나타냅니다.
<img width="1912" height="904" alt="image" src="https://github.com/user-attachments/assets/19db2827-b935-4d2a-bfd7-b2987f978fea" />

2. 객체 조회 페이지 : 기간을 선택하고 이동하는 객체(사람)을 클릭하면 해당 객체의 동선(이벤트 목록)을 나타냅니다. 해당 이벤트 클릭 시 이벤트의 상세 정보를 모달 형태로 조회합니다. 지정한 별칭(Alias)을 통해 검색할 수 있습니다. 
<img width="1915" height="913" alt="image" src="https://github.com/user-attachments/assets/ce7e5b26-838b-4296-a399-46e9ad7fc91b" />

3. 이벤트 조회 페이지 : 기간을 선택하여 해당 기간동안 발생한 이벤트를 조회합니다. 해당 이벤트 클릭 시 이벤트의 상세 정보를 모달 형태로 조회합니다. 데이터베이스에 저장된 이벤트 목록을 통해 검색할 수 있습니다.
<img width="1915" height="909" alt="image" src="https://github.com/user-attachments/assets/94f9ffe1-d957-4cf9-84c4-c07bcbe2ffa6" />

4. 카메라 조회 페이지 : 현재 데이터베이스에 존재하는 카메라의 위치를 구글맵에 마커 형태로 나타내며, 마커 클릭 시 카메라에 발생한 이벤트 정보를 조회할 수 있습니다. 이벤트 정보 클릭 시 이벤트의 상세 페이지로 이동합니다.
<img width="1917" height="905" alt="image" src="https://github.com/user-attachments/assets/472b6383-3cd1-4fe6-ba4a-7658b5be548d" />
<img width="1908" height="901" alt="image" src="https://github.com/user-attachments/assets/43a09209-a0a0-4fad-9401-c467f6f448d8" />

5. 보고서 생성 페이지 : 보고서를 생성할 객체 목록을 선택 후 보고서 생성 버튼을 클릭하면 객체의 정보, 동선 및 작성자가 포함된 hwp 파일을 다운로드할 수 있습니다.
<img width="1914" height="909" alt="image" src="https://github.com/user-attachments/assets/e42a2b5f-5fa6-4c42-b95a-a7e20429aa17" />
<img width="1913" height="906" alt="image" src="https://github.com/user-attachments/assets/f9eb205a-1448-4ca4-a290-6f06d5ad85a7" />

6. 챗봇 모달 : 오른쪽 위의 ? 버튼을 클릭하여 챗봇 모달 창을 불러올 수 있으며, 자연어 형태로 원하는 데이터를 조회할 수 있습니다. (현재 API 미연결)
<img width="1917" height="909" alt="image" src="https://github.com/user-attachments/assets/71986037-22d3-4d39-8b81-33f10de9a855" />

## 실행 방법
(※ [백엔드 서버](https://github.com/CapstoneDesign2-C3/Backend)를 우선적으로 배포한 후에 사용할 수 있습니다.)

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
