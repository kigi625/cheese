const { DeleteObjectCommand, S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.AWS_REGION
});
async function byKey(Key) {
    const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_DEFAULT_BUCKET,
        Key,
    });

    /*
    * {
  '$metadata': {
        httpStatusCode: 204,
        requestId: '8RGF29FP998VSHF2',
        extendedRequestId: 'S+S84Ow+qxU5cqjpWbSGaGIC3WLEF79+EGYL/HMIxHNe23s0q17F/Hd4x7URaTMco3SeD3SputY=',
        cfId: undefined,
        attempts: 1,
        totalRetryDelay: 0
      }
    }
* */
    try {
        const response = await s3.send(command);
        serverLog('RUN Delete s3 object by Key: ', Key);
        return Key;
    } catch (e) {
        serverLog('ERROR Delete s3 object by Key: ', Key, e);
    }
}

async function byRequest(req) {
    try {
        if (!req.files || !Object.keys(req.files).length) {
            return null;
        }
        const queue = [];
        for (let key in req.files) {
            queue.push(...req.files[key].map(item => item.key));
        }
        await Promise.allSettled(queue.map(item => byKey(item)));
    } catch (e) {
        serverLog('ERROR Delete s3 object by Request: ', e);
    }
}

module.exports = {
    byKey,
    byRequest
}
