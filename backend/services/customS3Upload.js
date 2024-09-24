const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuid } = require('uuid');

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.AWS_REGION
});

function extractMimeType(base64String) {
    const match = base64String.match(/^data:(.*?);base64,/);
    return match ? match[1] : null;
}

async function imageByBase64(base64Data) {
    try {
        const mimetype = extractMimeType(base64Data);
        if(!mimetype || !mimetype.startsWith('image/')) {
            throw new Error('Invalid mimetype: ' + mimetype);
        }
        const ext = mimetype.split('/').pop();
        const buffer = Buffer.from(base64Data.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const key = `uploads/${uuid()}.${ext}`;
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_DEFAULT_BUCKET,
            Key: key,
            Body: buffer,
            ContentType: mimetype,
        });
        await s3.send(command);
        return key;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    imageByBase64
}
