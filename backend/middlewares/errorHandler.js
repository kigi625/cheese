async function handler(error, req, res, next) {
    const result = {
        status: error.status || 500,
        message: ERROR_MSG[req._language]?.UNKNOWN,
        data: error.data || {},
        name: error.name,
        code: error.code
    };
    switch (error.name) {
        case 'NotFoundError':
            result.status = 404;
            result.message = ERROR_MSG[req._language]?.NOT_FOUND_REQUEST;
            break;
        case 'BadRequestError':
            result.message = error.messages[req._language]?.[error.code];
            break;
        case 'AuthorizationError':
            // 상위 두개: JWT 모듈 에러
            if (error.message === 'TokenExpiredError') {
                result.message = error.messages[req._language]?.['TOKEN_EXPIRED'];
            } else if (error.message === 'JsonWebTokenError') {
                result.message = error.messages[req._language]?.['JWT_ERROR'];
            } else {
                result.message = error.messages[req._language]?.[error.code];
            }
            break;
        case 'AuthenticationError':
            result.message = error.messages[req._language]?.[error.code];
            break;
        case 'SequelizeUniqueConstraintError':
            result.message = ERROR_MSG.DUP;
            break;
        case 'InternalServerError':
            break;
        case 'CustomMessageError':
            result.message = error.message;
            break;
        default:
            serverLog(error);
    }
    if (req.headers[HEADERS.IGNORE_ERROR] === 'true') {
        return responseWrapper(res, result);
    }
    res._body_buffer = JSON.stringify(result);
    return res.status(result.status).json(result);
}

module.exports = handler;
