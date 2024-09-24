const axios = require('axios');
const crypto = require('crypto');
const moment = require('moment');

const {NCP_ACCESS_KEY, NCP_SECRET_KEY, NCP_SERVICE_ID, NCP_CALL_NUMBER} = process.env;

function generateSignature(method, path, timestamp) {
    const hmac = crypto.createHmac('sha256', NCP_SECRET_KEY);
    hmac.update(method);
    hmac.update(' ');
    hmac.update(path);
    hmac.update('\n');
    hmac.update(timestamp);
    hmac.update('\n');
    hmac.update(NCP_ACCESS_KEY);
    return hmac.digest('base64').toString();
};

function generateHeader(method, path) {
    const timestamp = new Date().getTime().toString();
    return {
        'Content-Type': 'application/json',
        'x-ncp-apigw-timestamp': timestamp,
        'x-ncp-iam-access-key': NCP_ACCESS_KEY,
        'x-ncp-apigw-signature-v2': generateSignature(method, path, timestamp)
    };
};

async function transferSMS(messageData) {
    try {
        const data = {
            type: messageData.type || 'LMS',
            from: NCP_CALL_NUMBER,
            content: messageData.content,
            subject: messageData.subject, // 제목
            messages: messageData.to.map((item) => {
                return {to: item.replace(/\D/g, '')};
            })
        };
        if (messageData.reserveTime) {
            if (new Date(messageData.reserveTime).getTime() - new Date().getTime() < 10 * 60 * 1000 ) {
                throw new BadRequestError('Reservations can only be made at least 10 minutes later.');
            }
            data.reserveTime = moment(new Date(messageData.reserveTime)).format('YYYY-MM-DD HH:mm');
        }
        const options = {
            headers: generateHeader('POST', `/sms/v2/services/${NCP_SERVICE_ID}/messages`)
        };
        const result = await axios.post(`https://sens.apigw.ntruss.com/sms/v2/services/${NCP_SERVICE_ID}/messages`, data, options);
        return result.data.requestId;
    } catch (e) {
        serverLog(e);
        throw new BadRequestError('SMS_SEND_FAIL');
    }
}

module.exports = {
    transferSMS
};
