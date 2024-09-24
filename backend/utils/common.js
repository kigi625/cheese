const readline = require('readline');

function ignoreError(fn, ...params) {
    return new Promise(async (resolve) => {
        try {
            const result = await fn(...params);
            return resolve(result);
        } catch (e) {
            return resolve(null);
        }
    });
}

function promptConfirm(question) {
    return new Promise((resolve, reject) => {
        const prompt = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        prompt.question(question + ' (Enter y or n): ', (answer) => {
            prompt.close();
            if (answer.toLowerCase() !== 'y') {
                return resolve(false);
            }
            return resolve(true);
        });
    });
}

module.exports = {
    ignoreError,
    promptConfirm
};
