const validLanguage = ['ko', 'en'];
let reqSeqNo = 1;

async function handler(req, res, next) {
    if (reqSeqNo > 9_999_999) {
        reqSeqNo = 1;
    }
    try {
        /* --------- [ALB HealthChecker] --------- */
        if (/ELB-HealthChecker/g.test(req.headers['user-agent'])) {
            serverLog('ELB-HealthChecker');
            return responseWrapper(res);
        }

        /* --------- [헤더 전처리] --------- */
        let { [HEADERS.LANGUAGE]: language } = req.headers;
        if (!language) {
            language = 'ko';
        } else if (!validLanguage.includes(language)) {
            throw new BadRequestError('INVALID_REQUEST_HEADERS');
        }
        req._language = language || 'ko';
        req._reqSeqNo = reqSeqNo++;
        req._reqSeqNo = req._reqSeqNo.toString().padStart(7, '0');
        console.log(`\x1b[33m=============================== Open =============================== [${req._reqSeqNo}]\x1b[0m`);

        return next();
    } catch (e) {
        return next(e);
    }
}

module.exports = handler;
