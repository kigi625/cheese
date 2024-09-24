const util = require('util');
const messages = {
    ko: {
        FORBIDDEN: '권한이 없습니다.',
        INVALID_ROLE: '권한이 없습니다.',
        ACCESS_DENIED: '접근할 수 없습니다.'
    },
    en: {
        FORBIDDEN: 'Forbidden access.',
        INVALID_ROLE: 'Forbidden access.',
        ACCESS_DENIED: 'Access denied.'
    }
};

class AuthenticationError extends Error {
    messages = messages;

    constructor(message, data = {}) {
        super(message);
        this.name = this.constructor.name;
        this.status = 403;
        this.data = data;
        this.message = '';
        this.code = message;
    }

    [util.inspect.custom](depth, options) {
        const {messages, stack, ...otherProps} = this;
        return `${this.name}: ${this.code}\n${stack}`;
    }
}

module.exports = AuthenticationError;
