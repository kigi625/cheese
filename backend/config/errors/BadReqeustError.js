const util = require('util');
const messages = {
    ko: {
        NOT_FOUND_USER: '사용자를 찾을 수 없습니다.',
        NOT_FOUND_DATA: '데이터를 찾을 수 없습니다.',
        NOT_FOUND_FILE: '파일을 찾을 수 없습니다.',
        INVALID_REQUEST_PARAMETER: '요청 정보가 유효하지 않습니다.',
        INVALID_REQUEST_HEADERS: '요청 헤더가 유효하지 않습니다.',
        UNMATCHED_SIGN_AUTH: '인증번호가 일치하지 않습니다.',
        EXPIRED_SIGN_AUTH: '인증번호가 만료되었습니다.',
        DUP: '중복된 데이터입니다.',
        DUP_EMAIL: '이미 사용 중인 이메일입니다.',
        DUP_PHONE: '이미 사용 중인 연락처입니다.',
        ACCESS_DENIED: '접근할 수 없습니다.',
        EXCEEDED_DATA_LIMIT: '데이터를 추가할 수 없습니다.'
    },
    en: {
        NOT_FOUND_USER: 'User not found.',
        NOT_FOUND_DATA: 'Data not found.',
        NOT_FOUND_FILE: 'File not found.',
        INVALID_REQUEST_PARAMETER: 'Invalid request parameters.',
        INVALID_REQUEST_HEADERS: 'Invalid request headers.',
        UNMATCHED_SIGN_AUTH: 'Verification code does not match.',
        EXPIRED_SIGN_AUTH: 'Verification code has expired.',
        DUP: 'Duplicate data.',
        DUP_EMAIL: 'This email is already in use.',
        DUP_PHONE: 'This phone number is already in use.',
        ACCESS_DENIED: 'Access denied.',
        EXCEEDED_DATA_LIMIT: 'Unable to add data.'
    }
};

class BadRequestError extends Error {
    messages = messages;

    constructor(message, data = {}) {
        super(message);
        this.name = this.constructor.name;
        this.status = 400;
        this.data = data;
        this.message = '';
        this.code = message;
    }

    [util.inspect.custom](depth, options) {
        const {messages, stack, ...otherProps} = this;
        return `${this.name}: ${this.code}\n${stack}`;
    }
}

module.exports = BadRequestError;
