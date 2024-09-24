# MVPICK - DEFAULT Vue3
기본적으로 nuxt3 - primevue3 를 사용하고
BACKEND 는 EXPRESS를 사용함
페이지별로 메타에 CSRF 토큰을 사용 ( 외붕에서 호출불가 , 단 GET은 허용됨 - 필요한경우 차단)
.env.default => .env로

백엔드는 backend 폴더내에 .env 별도로 존재함
base64코드 인풋시에 요청시 축약되서 표시되도록 되있음


# 다른 레이아웃 사용시엔
```
<script>
definePageMeta({
  layout: "admin", //이름
});
export default{ }
</script>
```

# 유효성 검사는 Yup 으로
다음 코드의 title , url , upload_file 은 data() 에 사용되는 값들임.
자세한 사용방법은 https://velog.io/@boyeon_jeong/Yup-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0  참고
```
schema = this.$yup.object().shape({
    title: this.$yup.string().required("제목을 입력해주세요"),
    url: this.$yup.string().required("영상 주소를 입력해주세요"),
    upload_file: this.$yup
    .mixed()
    .required("이미지 파일을 업로드해주세요")
    .test(
        "fileSize",
        "파일 사이즈가 5MB를 넘을 수 없습니다.",
        (value) => value.size <= 5 * 1024 * 1024
    ),
});

schema
.validate(this.payload, {
    abortEarly: false, // 모든 에러를 한번에 반환
})
.then((res) => {
    this.$confirm.require({
    group: "headless",
    header: "저장여부",
    message: "저장 하시겠습니까?",
    acceptLabel: "저장",
    rejectLabel: "취소",
    accept: async () => {
        let result = await $fetch("/api/admin/videoUpdate", {
        method: this.$route.query.id ? "PUT" : "POST", //여기서 id 의 유무에 따라서 method 타입 변경함
        body: formData,
        });
        if (result.message == "OK") {
        this.$confirm.require({
            group: "headless",
            header: "등록완료",
            message: "등록 완료 되었습니다.",
            accept: () => {
            this.$router.go(-1);
            },
        });
        }
    },
    reject: () => {
        console.log("취소");
    },
    });
})
.catch((err) => {
    this.$confirm.require({
    group: "headless",
    header: "에러",
    message:
        "다음 에러들을 확인해주세요</br><span style='color:#777'>" +
        err.errors.join("</span></br><span style='color:#777'>"),
    accept: () => {
        console.log("확인");
    },
    });
});
```
# 유저에게 알림은 $confirm (primvue 컴포넌트를 재정의) 스타일 수정시 해당컴포넌트에서 수정
```
 this.$confirm.require({
    group: "headless",
    header: "저장여부",
    message: "저장 하시겠습니까?",
    acceptLabel: "저장", //라벨명
    rejectLabel: "취소", //라벨명
    accept: async () => {
        let result = await $fetch("/api/admin/videoUpdate", {
        method: this.$route.query.id ? "PUT" : "POST", //여기서 id 의 유무에 따라서 method 타입 변경함
        body: formData,
        });
        if (result.message == "OK") {
        this.$confirm.require({
            group: "headless",
            header: "등록완료",
            message: "등록 완료 되었습니다.",
            accept: () => {
            this.$router.go(-1);
            },
        });
        }
    },
    reject: () => {
        console.log("취소");
    },
    });
```
## 시작
Make sure to install the dependencies:

```bash
.env.default 를 .env 로 바꿀것
#yarn dev
빌드시는 
#yarn build
빌드된 서버 실행시는
node .output/server/index.mjs 로 실행..
가급적 ecosystem.config.cjs 또는 mjs로 pm2 실행할것

```
# Nuxt 3 Minimal Starter
Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## 환경변수

### Nuxt

| 변수 이름             | 설명             | 예시                              |
|-------------------|----------------|---------------------------------|
| `API_PROXY_URL`   | 기본 API 엔드포인트   | `http://localhost:3001`         |
| `IMAGE_PROXY_URL` | 이미지 스토리지 엔드포인트 | `https://sample.cloudfront.net` |
```dotenv
API_PROXY_URL=http://localhost:3001
IMAGE_PROXY_URL=https://sample.cloudfront.net
```

### Express

| 변수 이름                | 설명                                    | 예시                              |
|----------------------|---------------------------------------|---------------------------------|
| `EXPRESS_PORT`       | Port                                  | `3001`                          |
| `CIPHER_KEY`         | Crypto key(최대 32자)                    | `mvpick`                        |
| `SERVICE_NAME`       | 서비스명(Default: `Service`)              | `엠브이픽`                          |
| `SEQUELIZE_ROLE`     | Sequelize 권한 <br>`master` 할당 시 동기화 진행 | `master`                        |
| `SEQUELIZE_HOST`     | Sequelize 호스트                         | `localhost`                     |
| `SEQUELIZE_USER`     | Sequelize 유저                          | `admin`                         |
| `SEQUELIZE_PASS`     | Sequelize 패스워드                        | `password`                      |
| `SEQUELIZE_NAME`     | Sequelize 데이터베이스 이름                   | `database`                      |
| `SEQUELIZE_PORT`     | Sequelize 포트                          | `3306`                          |
| `AWS_REGION`         | AWS Credential region                 | `ap-northeast-2`                |
| `AWS_ACCESS_KEY`     | AWS Credential                        | `-`                             |
| `AWS_SECRET_KEY`     | AWS Credential                        | `-`                             |
| `AWS_DEFAULT_BUCKET` | AWS Bucket                            | `-`                             |
| `CLOUD_FRONT`        | AWS CF (선택)                           | `https://sample.cloudfront.net` |
| `MAILER_SERVICE`     | Nodemailer 서비스명                       | `gmail`                         |
| `MAILER_HOST`        | 메일서버 주소                               | ``                              |
| `MAILER_PORT`        | 메일서버 포트                               | ``                              |
| `MAILER_USER`        | 메일서버 유저                               | ``                              |
| `MAILER_PASS`        | 메일서버 패스워드                             | ``                              |
| `DISABLE_QUERY_SINGLE_LINE`        | 데이터베이스 쿼리 한 줄로 출력 여부 (0: 한 줄, 1: 그대로) | `0`                              |
```dotenv
### Common
EXPRESS_PORT=3001
CIPHER_KEY=mvpick
SERVICE_NAME=엠브이픽

### Sequelize
#SEQUELIZE_ROLE=master
SEQUELIZE_HOST=localhost
SEQUELIZE_USER=admin
SEQUELIZE_PASS=password
SEQUELIZE_NAME=database
SEQUELIZE_PORT=3306

### AWS
AWS_REGION=ap-northeast-2
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_DEFAULT_BUCKET=bucket
CLOUD_FRONT=https://sample.cloudfront.net

### Nodemailer
MAILER_SERVICE=gmail
MAILER_HOST=smtp.gmlail.com
MAILER_PORT=587
MAILER_USER=mvpick
MAILER_PASS=password
```
