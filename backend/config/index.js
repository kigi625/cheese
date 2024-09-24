const Enum = require('./enum');
const Errors = require('./errors');
const KST = function () {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    return new Date(utc + koreaTimeDiff);
};
const getStackTrace = function (args) {
    let obj = {};
    let stack;
    if (args instanceof Error) {
        stack = args.stack;
    } else {
        Error.captureStackTrace(obj, getStackTrace);
        stack = obj.stack;
    }

    let lines = stack.split('\n').slice(1);
    return '\n' + lines.slice(0, 4).join('\n');
};

const getLine = function (stack, index = 1) {
    let result = stack.match(/\(.*?\)|\s.+/g) || [];
    let arr = result.map((it) => {
        return it.split(' ').pop().replace(/\(|\)/g, '');
    });
    return arr[1] ?? '';
};

const serverLog = function (...args) {
    let message = '';
    let stack = '';
    let method = 'log';
    for (let arg of args) {
        if (arg instanceof Error) {
            stack += `${arg.name}: ${arg.message}` + getStackTrace(arg);
            method = 'error';
            message += arg;
        } else {
            message += arg;
        }
        //arg 에서 stack을 가져오는 부분이 없어서 추가함

    }
    //console[method](KST().toLocaleString(), message, stack);

    if (method === 'error') {
        log.error(message, stack); //에러는 pino로 별도 처리
        console[method](KST().toLocaleString(), message, stack);
    } else {
        //log.info(message, stack); //이부분은 pino info 사용시 base64 데이터가 로깅되는 문제가 있어서 주석처리함
        console[method](KST().toLocaleString(), message, stack);
    }
};

const responseWrapper = function (res, data) {
    //res 의 헤더가 이미지로 설정되어 있을 경우, 이미지로 응답한다.
    if (res.headersSent) {
        return; // 이미 응답이 전송된 경우, 추가 작업 없이 반환
    }
    if (res.get('Content-Type') && (res.get('Content-Type').includes('image') || res.get('Content-Type').includes('mp4'))) {
        return res;
    }else{ //이미지가 아닌 경우에는 json으로 응답한다.
        const result = {
            status: 200,
            message: 'OK',
            data
        };
        /**
         * 로깅용 임시 저장
         */
        res._body_buffer = JSON.stringify(result);
        return res.status(200).json(result);
    }
};

function setProcessListener() {
    process.on('SIGINT', () => {
        console.error(KST().toLocaleString(), 'Received SIGINT. Flushing and closing application...');
        process.exit();
    });
    process.on('SIGTERM', () => {
        console.error(KST().toLocaleString(), 'Received SIGTERM. Flushing and closing application...');
        process.exit();
    });
    process.on('unhandledRejection', (reason, promise) => {
        console.error(KST().toLocaleString(), 'Unhandled Rejection at:', promise, 'reason:', reason);
    });
    process.on('uncaughtException', (err, origin) => {
        console.error(KST().toLocaleString(), 'Uncaught Exception thrown:', err, 'origin:', origin);
    });
}

setProcessListener();

global['KST'] = KST;
global['serverLog'] = serverLog;
global['responseWrapper'] = responseWrapper;
