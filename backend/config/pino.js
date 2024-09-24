const multistream = require('pino-multi-stream').multistream;
const fs = require('fs');
const pino = require('pino');
const prettyStream = require('pino-pretty')({
    colorize: true,
    translateTime: "SYS:standard",
    ignore: "pid,hostname",
});
// 파일 스트림 생성
// 사용자 정의 스트림 - 파일에 로그를 기록하기 전에 메시지 포맷팅
const customFileStream = {
    write: (msg) => {
        const obj = JSON.parse(msg);
        const time = new Date(obj.time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
        //obj.req 의 body에서 base64 데이터는 는 base64 code 라는 표현으로 대체
        if (obj.req && obj.req.body) {
            obj.req.body = JSON.stringify(obj.req.body).replace(/data:image\/\w+;base64,[^"]+/g, 'base64 code');
        }
        const reqInfo = obj.req ? `, "req": ${JSON.stringify(obj.req)}` : '';
        const formattedMsg = `{"level":${obj.level},"time":"${time}","stack":"${obj.error}","msg":"${obj.msg}"${reqInfo}}\n`;
        fs.appendFileSync('./error.log', formattedMsg, { flags: 'a' });
    }
};
// 멀티 스트림 설정 (콘솔 , 파일)
const streams = [
    { level: 'error', stream: customFileStream }, // 에러 로그만 파일에 기록
];

// pino 로거 설정
const logger = pino({
    level: 'info',
}, multistream(streams));


global['log'] = logger;