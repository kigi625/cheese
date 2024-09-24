const BadRequestError = require('./BadReqeustError');
const AuthorizationError = require('./AuthorizationError');
const AuthenticationError = require('./AuthenticationError');
const InternalServerError = require('./InternalServerError');
const CustomMessageError = require('./CustomMessageError');

global['BadRequestError'] = BadRequestError;
global['AuthorizationError'] = AuthorizationError;
global['AuthenticationError'] = AuthenticationError;
global['InternalServerError'] = InternalServerError;
global['CustomMessageError'] = CustomMessageError;
global['ERROR_MSG'] = {
    ko: {
        NOT_FOUND_REQUEST: '요청을 찾을 수 없습니다.',
        UNKNOWN: '알 수 없는 오류입니다.',
        DUP: '중복된 데이터입니다.'
    },
    en: {
        NOT_FOUND_REQUEST: 'Request not found',
        UNKNOWN: 'Unknown error occurred.',
        DUP: 'Duplicate data.'
    }
};
