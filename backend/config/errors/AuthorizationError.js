const util = require('util');
const messages = {
    ko: {
        NOT_FOUND_JWT: '접근할 수 없습니다.',
        TOKEN_EXPIRED: '접근할 수 없습니다.',
        JWT_ERROR: '접근할 수 없습니다.',
        NOT_FOUND_CLIENT_ID: '접근할 수 없습니다.',
        INVALID_CLIENT_ID: '접근할 수 없습니다.',
        NOT_EXIST_USER: '접근할 수 없습니다.'
    },
    en: {
        NOT_FOUND_JWT: 'Unauthorized access.',
        TOKEN_EXPIRED: 'Unauthorized access.',
        JWT_ERROR: 'Unauthorized access.',
        NOT_FOUND_CLIENT_ID: 'Unauthorized access.',
        INVALID_CLIENT_ID: 'Unauthorized access.',
        NOT_EXIST_USER: 'Unauthorized access.'
    }
};

class AuthorizationError extends Error {
    messages = messages;

    constructor(message, data = {}) {
        super(message);
        this.name = this.constructor.name;
        this.status = 401;
        this.data = data;
        this.message = '';
        this.code = message;
    }

    [util.inspect.custom](depth, options) {
        const {messages, stack, ...otherProps} = this;
        return `${this.name}: ${this.code}\n${stack}`;
    }
}

module.exports = AuthorizationError;
