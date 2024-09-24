const cipher = require('../utils/cipher');
const {
    sequelize
} = require('../models');

const allowedRoutes = [
    // { method: 'POST', path: '/admin/sign/in' },
    // { method: 'GET', path: '/admin/loginCheck'},
    // { method: 'POST', path: '/admin/sign/out' },
    { method: 'GET', path: '/common/csrf-token' }
];

async function handler(req, res, next) {
    try {
        const { [COOKIE.ADMIN.ACCESS_TOKEN]: accessToken } = req.cookies;
        const { pathname } = req._parsedUrl;
        if (
            allowedRoutes.some(item => item.method === req.method && item.path === pathname)
        ) {
            req._admin = {};
            return next();
        }

        const decoded = await cipher.JWTVerify(accessToken);
        req._admin = decoded;

        const [admin] = await sequelize.query(`SELECT id FROM admin WHERE id = :id AND isEnabled = true`, {
            replacements: { id: decoded.id, role: decoded.adminRole },
            logging: false
        });
        if (!admin.length) {
            throw new AuthenticationError('FORBIDDEN');
        }
        return next();
    } catch (e) {
        return next(e);
    }
}

module.exports = handler;
