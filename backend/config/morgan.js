const morgan = require('morgan');

morgan.token('url', (req) => req.baseUrl + req.path);
morgan.token('querydata', (req) => {
    return Object.keys(req.query).length ? JSON.stringify(req.query) : 'None';
});
morgan.token('bodydata', (req, res) => {
    let result = {};

    // req.body 가 없을 경우
    if (!req.body) {
        result.json = 'None';
        return JSON.stringify(result);
    }
    if (Object.keys(req.body).length) {
        // body 에서 base64 데이터는 제외
        req.body = JSON.stringify(req.body).replace(/data:image\/\w+;base64,[^"]+/g, 'base64 code');
        result.json = req.body;
    } else {
        result.json = 'None';
    }
    if (!!req.files) {
        if (Array.isArray(req.files)) {
            result.file = req.files.map(file => `${file.originalname}(${file.size})`);
        } else if (typeof req.files === 'object' && Object.keys(req.files).length) {
            result.file = Object.keys(req.files).reduce((acc, item) => {
                acc[item] = (req.files[item].map(file => `${file.originalname}(${file.size})`));
                return acc;
            }, {});
        }
    }
    const message = JSON.stringify(result);
    const limit = 1000;
    const subMessage = message?.length - limit > 0 ? ` ... More ${message.length - limit} Character` : '';
    return message.slice(0, limit) + subMessage;
});
morgan.token('remote-addr', (req) => {
    try {
        return (
            req.headers['x-forwarded-for'].replace(/ /g, '').split(',')[0] ||
            undefined
        );
    } catch (e) {
        return req.ip || req._remoteAddress || undefined;
    }
});
morgan.token('KST', () => {
    return KST().toLocaleString();
});
morgan.token('response-body', (req, res) => {
    const limit = 3000;
    const subMessage = res._body_buffer?.length - limit > 0 ? ` ... More ${res._body_buffer.length - limit} Character` : '';
    return res._body_buffer?.slice(0, limit) + subMessage;
});
morgan.token('decodedUserJWT', (req) => {
    if (req._user) {
        const result = {
            ...req._user,
            sec: Math.floor((req._user.exp * 1000 - Date.now()) / 1000)
        };
        return JSON.stringify(result);
    }
    return null;
});
morgan.token('decodedAdminJWT', (req) => {
    if (req._admin) {
        const result = {
            ...req._admin,
            sec: Math.floor((req._admin.exp * 1000 - Date.now()) / 1000)
        };
        return JSON.stringify(result);
    }
    return null;
});
morgan.token('customHeaders', (req) => {
    const result = {
        [HEADERS.CSRF_TOKEN]: req.headers[HEADERS.CSRF_TOKEN]
    };
    for (let item in HEADERS) {
        if (req.headers[HEADERS[item]]) {
            result[HEADERS[item]] = req.headers[HEADERS[item]];
        }
    }
    return JSON.stringify(result);
});
morgan.token('customCookies', (req) => {
    const result = {
        [COOKIE.USER.ACCESS_TOKEN]: req.cookies[COOKIE.USER.ACCESS_TOKEN],
        [COOKIE.ADMIN.ACCESS_TOKEN]: req.cookies[COOKIE.ADMIN.ACCESS_TOKEN],
        [COOKIE.COMMON.CLIENT_ID]: req.cookies[COOKIE.COMMON.CLIENT_ID]
    };
    return JSON.stringify(result);
});
morgan.token('line-request', (req) => {
    return `\x1b[33m============================== Request ============================= [${req._reqSeqNo}]\x1b[0m`;
});
morgan.token('line-response', (req) => {
    return `\x1b[33m============================= Response ============================= [${req._reqSeqNo}]\x1b[0m`;
});
morgan.token('line-close', (req) => {
    return `\x1b[33m=============================== Close ============================== [${req._reqSeqNo}]\x1b[0m\n`;
});
morgan.format(
    'mvpick-dev',
    ':line-request\n' +
    'Datetime       : :KST\n' +
    'Source address : :remote-addr\n' +
    'Method         : :method\n' +
    'URL            : :url\n' +
    'Content-Type   : :req[content-type]\n' +
    'Request-data\n' +
    '   Query       : :querydata\n' +
    '   Body        : :bodydata\n' +
    'Decoded JWT(U) : :decodedUserJWT\n' +
    'Decoded JWT(A) : :decodedAdminJWT\n' +
    'Custom Headers : :customHeaders\n' +
    'Custom Cookies : :customCookies\n' +
    ':line-response\n' +
    'StatusCode     : :status\n' +
    'Response-Time  : :response-time ms\n' +
    'Response-Body  : :response-body\n' +
    ':line-close'
);

module.exports = morgan('mvpick-dev');
