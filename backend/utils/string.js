function snakeToCamel(text) {
    return text.replace(/([-_]\w)/g, function (g) {
        return g[1].toUpperCase();
    });
}

function snakeToPascal(str) {
    return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function generateRandomNumber(n) {
    let randomNum = Math.floor(Math.random() * 10 ** n).toString();
    randomNum = randomNum.padStart(n, '0');
    return randomNum;
}

function maskEmail(email, maskLength = 4) {
    const [username, domain] = email.split('@');

    let maskedUsername;
    if (username.length >= maskLength) {
        maskedUsername = username.slice(0, -maskLength) + '*'.repeat(maskLength);
    } else {
        const halfLength = Math.floor(username.length / 2);
        maskedUsername = username.slice(0, -halfLength) + '*'.repeat(halfLength);
    }

    return maskedUsername + '@' + domain;
}

function camelToPascal(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function convertToBoolean(str) {
    if (typeof str === 'boolean') {
        return str;
    }
    if (typeof str !== 'string') {
        return null;
    }
    if (str === 'true' || str === '1') {
        return true;
    } else if (str === 'false' || str === '0') {
        return false;
    } else {
        return null;
    }
}

module.exports = {
    snakeToCamel,
    snakeToPascal,
    camelToPascal,
    generateRandomNumber,
    maskEmail,
    convertToBoolean
};
