const { sequelize } = require('../models');
const deleteS3Object = process.env.S3_USE === 'true' ? require('../services/deleteS3Object') : null;

function replaceError(e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
        const newError = new BadRequestError('DUP');
        newError.stack = e.stack;
        newError.message = e.parent.message;
        e = newError;
    } else if (
        !(e instanceof BadRequestError) &&
        !(e instanceof AuthorizationError) &&
        !(e instanceof AuthenticationError) &&
        !(e instanceof CustomMessageError)
    ) {
        const newError = new InternalServerError('SERVER');
        newError.stack = e.stack;
        newError.message = e.message;
        e = newError;
    }
    return e;
}

//=====================================================================

function getIp(req) {
    try {
        return req.headers['x-forwarded-for'].replace(/ /g, '').split(',')[0] || undefined;
    } catch (e) {
        return req.ip || req._remoteAddress || undefined;
    }
}

function CreateController(name = 'default', fn) {
    return async function (req, res, next) {
        try {
            serverLog(`[${req._reqSeqNo}] RUN Function[ ${name} ]`);
            const result = await fn({ req, res, next });
            return responseWrapper(res, result);
        } catch (e) {
            e = replaceError(e);
            serverLog(`[${req._reqSeqNo}] ERROR Function[ ${name} ] `, e);
            if (process.env.S3_USE === 'true' && req.files && Object.keys(req.files).length) {
                await deleteS3Object.byRequest(req);
            }
            return next(e);
        }
    };
}

function CreateControllerTx(name = 'default', fn) {
    return async function (req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            serverLog(`[${req._reqSeqNo}] RUN Function[ ${name} ]`);
            const result = await fn({ req, res, next, transaction });
            await transaction.commit();
            return responseWrapper(res, result);
        } catch (e) {
            e = replaceError(e);
            serverLog(`[${req._reqSeqNo}] ERROR Function[ ${name} ] `, e);
            await transaction.rollback();
            if (process.env.S3_USE === 'true' && req.files && Object.keys(req.files).length) {
                await deleteS3Object.byRequest(req);
            }
            return next(e);
        }
    };
}

module.exports = {
    getIp,
    CreateController,
    CreateControllerTx
};
