const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');

const {CIPHER_KEY} = process.env;
const AES_IV_LEN = 16;

const PBKDF2_ITER = 98672;
const PBKDF2_KEY_LEN = 64;
const PBKDF2_DIGEST = 'sha512';

const privateKeyFileName = 'privateKey.pem';
const publicKeyFileName = 'publicKey.pem';

async function generateRSAKeyPairFile() {
    serverLog('Generate RSA key pair...');
    const {privateKey, publicKey} = await generateRSAKeyPair();
    fs.writeFileSync(privateKeyFileName, privateKey);
    fs.writeFileSync(publicKeyFileName, publicKey);
}

async function verifyRSAKeyPairFile() {
    try {
        if (fs.existsSync(privateKeyFileName)) {
            const privateKeyFileStatus = fs.statSync(privateKeyFileName);
            if (privateKeyFileStatus.mtime < new Date().getTime() - (24 * 60 * 60 * 100)) {
                await generateRSAKeyPairFile();
            }
        } else {
            await generateRSAKeyPairFile();
        }
    } catch (e) {
        throw e;
    }
}

function generateRSAKeyPair() {
    return new Promise((resolve, reject) => {
        crypto.generateKeyPair('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        }, (err, publicKey, privateKey) => {
            if (err) {
                return reject(err);
            }
            return resolve({publicKey, privateKey});
        });
    });
}

function RSADecrypt(text) {
    const buffer = Buffer.from(text, 'base64');
    const decrypted = crypto.privateDecrypt({
        key: APP_CONSTANTS.PRIVATE_KEY,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    }, buffer);
    return decrypted.toString('utf8');
}

function createAESKey() {
    return crypto.randomBytes(16).toString('hex').slice(0, 32);
}

function pbkdf2Verify(password, salt, hash) {
    password = password.toString();
    const key = crypto.pbkdf2Sync(password, salt, PBKDF2_ITER, PBKDF2_KEY_LEN, PBKDF2_DIGEST);
    return key.toString('base64') === hash;
}

function pbkdf2Encrypt(password, salt = null) {
    if (!salt) {
        const buffer = crypto.randomBytes(PBKDF2_KEY_LEN);
        salt = buffer.toString('base64');
    }
    password = password.toString();
    const key = crypto.pbkdf2Sync(password, salt, PBKDF2_ITER, PBKDF2_KEY_LEN, PBKDF2_DIGEST);
    return {
        signed: key.toString('base64'),
        salt
    };
}

function AESEncrypt(text, key) {
    if (typeof text !== 'string') {
        text = text.toString();
    }
    if (!key) {
        key = CIPHER_KEY;
    }
    try {
        key = Buffer.from(key.length >= 32 ? key.substring(0, 32) : key.padEnd(32, key), 'utf8');
        const iv = crypto.randomBytes(AES_IV_LEN);
        const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(key, 'hex'), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + encrypted.toString('hex');
    } catch (e) {
        return null;
    }
}

function AESDecrypt(text, key) {
    if (!key) {
        key = CIPHER_KEY;
    }
    try {
        key = Buffer.from(key.length >= 32 ? key.substring(0, 32) : key.padEnd(32, key), 'utf8');
        const iv = Buffer.from(text.slice(0, AES_IV_LEN * 2), 'hex');
        const encryptedText = Buffer.from(text.slice(AES_IV_LEN * 2), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(key, 'hex'), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (e) {
        return null;
    }
}

function JWTVerify(token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            return reject(new AuthorizationError('NOT_FOUND_JWT'));
        }
        jwt.verify(token, CIPHER_KEY, function (error, decoded) {
            if (error) {
                serverLog(error.name, decoded);
                return reject(new AuthorizationError(error.name));
            }
            return resolve(decoded);
        });
    });
}

function JWTCreate(payload = {}, options = {}) {
    try {
        const accessTokenOptions = {
            algorithm: 'HS512',
            expiresIn: options.expiresIn || '1d'
        };
        const refreshTokenOptions = {
            algorithm: 'HS512',
            expiresIn: '30d'
        };
        const accessToken = jwt.sign({...payload, type: 'A'}, CIPHER_KEY, accessTokenOptions);
        const refreshToken = jwt.sign({...payload, type: 'R'}, CIPHER_KEY, refreshTokenOptions);
        return {accessToken, refreshToken};
    } catch (e) {
        throw e;
    }
}

module.exports = {
    pbkdf2Verify,
    pbkdf2Encrypt,
    AESEncrypt,
    AESDecrypt,
    JWTVerify,
    JWTCreate,
    createAESKey,
    generateRSAKeyPair,
    generateRSAKeyPairFile,
    verifyRSAKeyPairFile,
    RSADecrypt
};
