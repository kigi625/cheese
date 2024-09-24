import {defineStore} from 'pinia';

async function importPublicKey(pem) {
    const pemHeader = '-----BEGIN PUBLIC KEY-----';
    const pemFooter = '-----END PUBLIC KEY-----';
    const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length - 1);

    const binaryDerString = window.atob(pemContents);
    const binaryDer = new Uint8Array(binaryDerString.length);
    for (let i = 0; i < binaryDerString.length; i++) {
        binaryDer[i] = binaryDerString.charCodeAt(i);
    }

    return window.crypto.subtle.importKey(
        'spki',
        binaryDer.buffer,
        {
            name: 'RSA-OAEP',
            hash: 'SHA-256'
        },
        true,
        ['encrypt']
    );
}

async function encryptWithPublicKey(publicKeyPem, plaintext) {
    const publicKey = await importPublicKey(publicKeyPem);
    const encoder = new TextEncoder();
    const encodedMessage = encoder.encode(plaintext);

    const encryptedData = await window.crypto.subtle.encrypt(
        {name: 'RSA-OAEP'},
        publicKey,
        encodedMessage
    );
    return window.btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
}

async function generateKeyFromPassword(password, keyLength = 32) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(password.padEnd(keyLength, password));
    const key = await crypto.subtle.importKey('raw', keyData, 'AES-CTR', true, ['encrypt', 'decrypt']);
    return key;
}

async function AESEncrypt(text, password) {
    const key = await generateKeyFromPassword(password);
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const encrypted = await crypto.subtle.encrypt({name: 'AES-CTR', counter: iv, length: 128}, key, data);
    return toHexString(iv) + toHexString(new Uint8Array(encrypted));
}

async function AESDecrypt(encryptedHex, password) {
    const key = await generateKeyFromPassword(password);
    const iv = fromHexString(encryptedHex.slice(0, 32));
    const encryptedData = fromHexString(encryptedHex.slice(32));
    const decrypted = await crypto.subtle.decrypt({name: 'AES-CTR', counter: iv, length: 128}, key, encryptedData);
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
}

function toHexString(byteArray) {
    return Array.from(byteArray, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
}

function fromHexString(hexString) {
    return Uint8Array.from(hexString.match(/.{1,2}/g), byte => parseInt(byte, 16));
}

export const useEncryptStore = defineStore('encrypt', {
    state: () => ({
        csrfToken: null,
        publicKey: null,
        payloadSecret: null
    }),
    actions: {
        async getPublicKey() {
            try {
                const res = await $fetch('/common/publicKey');
                this.publicKey = res.data.publicKey;
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        createPayloadSecret() {
            try {
                return crypto.randomUUID().replace(/\D/g, '');
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async encryptRSA(text) {
            try {
                return await encryptWithPublicKey(this.publicKey, text);
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async encryptAES(text, key) {
            try {
                return await AESEncrypt(text, key);
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async decryptAES(text, key) {
            try {
                return await AESDecrypt(text, key);
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
    },
    persist: true
});
