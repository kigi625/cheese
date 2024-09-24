function Enum(baseEnum) {
    return new Proxy(baseEnum, {
        get(target, name) {
            if (!baseEnum.hasOwnProperty(name)) {
                throw new Error(`"${name}"은/는 참조할 수 없습니다.`);
            }
            return baseEnum[name];
        },
        set(target, name, value) {
            if (name.startsWith('_')) {
                target[name.replace(/_/, '')] = value;
            } else {
                throw new Error('수정할 수 없습니다.');
            }
        }
    });
}

const ROLE = Enum({
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER',
    SUPER_ADMIN: 'S',
    GENERAL_ADMIN: 'G'
});

const cookiePrefix = 'LHS';
const COOKIE = Enum({
    OPTIONS: {
        DAYS30: () => {
            return {
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'strict'
            };
        },
        DAYS90: () => {
            return {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'strict'
            };
        },
        INFINITY: () => {
            return {
                expires: new Date(Date.now() + 50 * 365 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'strict'
            };
        }
    },
    USER: {
        ACCESS_TOKEN: `_${cookiePrefix}_UAT`,
        REFRESH_TOKEN: `_${cookiePrefix}_URT`
    },
    ADMIN: {
        ACCESS_TOKEN: `_${cookiePrefix}_AAT`,
        REFRESH_TOKEN: `_${cookiePrefix}_ART`
    },
    COMMON: {
        CLIENT_ID: `_${cookiePrefix}_CID`,
        CSRF_TOKEN: `_${cookiePrefix}_CSRF`
    }
});

const APP_CONSTANTS = Enum({
    SERVICE_NAME: process.env.SERVICE_NAME || 'Service',
    DELIMITER: ';',
    DELIMITER_SUB: '+'
});

const HEADERS = Enum({
    CLIENT_ID: 'x-client-identifier',
    LANGUAGE: 'x-client-language',
    IGNORE_ERROR: 'x-client-ignore-error',
    IGNORE_CID: 'x-client-ignore-cid',
    ENCRYPT: 'x-client-encrypt',
    ENCRYPT_TOKEN: 'x-client-encrypt-token',
    ENCRYPT_KEY: 'x-client-encrypt-key',
    CSRF_TOKEN: 'x-csrf-token'
});

global['ROLE'] = ROLE;
global['COOKIE'] = COOKIE;
global['APP_CONSTANTS'] = APP_CONSTANTS;
global['HEADERS'] = HEADERS;
