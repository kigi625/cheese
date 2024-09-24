const cipher = require('../utils/cipher');

const allowedRoutes = [
    { method: 'POST', path: '/client/sign/out' }
];

async function handler(req, res, next) {
    const { _parsedUrl } = req;
    const path = _parsedUrl.pathname;

    if (allowedRoutes.some((item) => item.method === req.method && item.path === path)) {
        serverLog(`Request path matched with 'allowedRoutes'.`);
        return next();
    }

    try {
        const { [COOKIE.USER.ACCESS_TOKEN]: accessToken } = req.cookies;
        if (!accessToken) {
            throw new AuthorizationError('NOT_FOUND_JWT');
        }

        const decoded = await cipher.JWTVerify(accessToken);
        req._user = decoded;

        if (decoded.role !== ROLE.USER) {
            throw new AuthenticationError('INVALID_ROLE');
        }

        return next();
    } catch (e) {
        return next(e);
    }
}

module.exports = handler;
