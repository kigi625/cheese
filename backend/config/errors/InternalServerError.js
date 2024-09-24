const util = require('util');

const messages = {
    ko: {
        SERVER: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        UNKNOWN: '알 수 없는 오류입니다.',
        FAILED_EXTERNAL_SERVICE: '외부 서비스 오류입니다.'
    },
    en: {
        UNKNOWN: 'Unknown error occurred.',
        SERVER: 'A server error occurred. Please try again later.',
        FAILED_EXTERNAL_SERVICE: 'External service error.'
    }
};

class InternalServerError extends Error {
    messages = messages;

    constructor(message, data = {}) {
        super(message);
        this.name = this.constructor.name;
        this.status = 500;
        this.data = data;
        this.message = '';
        this.code = message;
    }

    [util.inspect.custom](depth, options) {
        const {messages, stack, ...otherProps} = this;
        return `${this.name}: ${this.code}\n${stack}`;
    }
}

module.exports = InternalServerError;
