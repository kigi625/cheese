const nodemailer = require('nodemailer');
const {SERVICE_NAME} = APP_CONSTANTS;
const config = {
    service: process.env.MAILER_SERVICE,
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
};
const transporter = nodemailer.createTransport(config);

const template = {
    AUTH_CODE: {
        title: `Your Verification Code for ${SERVICE_NAME} Registration`,
        content: `Thank you for registering with ${SERVICE_NAME}.<br>` +
            `To complete your registration, please enter the following verification code on the registration page:<br><br>` +
            `Verification Code: <h3>#{authCode}</h3><br><br>` +
            `Note: This code is valid for 3 minutes only. If you do not enter the code within this time frame, it will expire, and you will need to request a new code.<br>` +
            `Best regards, ${SERVICE_NAME} Team`
    }
};

function replaceImageSrc(html) {
    return html.replace(/src="\/image/g, `src="${process.env.CLOUD_FRONT}`);
}

async function transfer(
    {
        to = [],
        title = '',
        content = '',
        options = {
            replaceImageSrc: false,
            templateCode: '',
            templateData: {}
        }
    } = {}
) {
    try {
        if (!Array.isArray(to) || !to.length) {
            throw new Error('Mail recipients not found.');
        } else if (!options.templateCode && (!title || !content)) {
            throw new Error('There is no mail title or content.');
        }
        if (options.replaceImageSrc) {
            content = replaceImageSrc(content);
        }
        if (options.templateCode) {
            title = template[options.templateCode].title;
            content = template[options.templateCode].content;
            for (let item in options.templateData) {
                title = title.replace(new RegExp(`#{${item}}`, 'g'), options.templateData[item]);
                content = content.replace(new RegExp(`#{${item}}`, 'g'), options.templateData[item]);
            }
        }

        const result = await Promise.allSettled(to.map(item => {
            return transporter.sendMail({
                from: `${SERVICE_NAME} <${config.auth.user}>`,
                to: item,
                subject: title,
                html: content
            });
        }));

        const accObject = {
            title,
            content,
            success: {
                count: 0, target: []
            },
            failed: {
                count: 0, target: []
            }
        };

        const report = result.reduce((acc, item) => {
            if (item.value?.accepted.length) {
                acc.success.count++;
                acc.success.target.push(item.value.accepted[0]);
            } else if (item.value?.rejected.length) {
                acc.failed.count++;
                acc.failed.target.push(`${item.value.rejected[0]} ${item.value.response}`);
            }
            return acc;
        }, accObject);

        return report;
    } catch (e) {
        throw e;
    }
}

module.exports = transfer;
