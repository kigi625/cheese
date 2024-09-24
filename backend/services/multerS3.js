const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const { v4: uuid } = require('uuid');

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.AWS_REGION
});

const storage = multerS3({
    s3,
    bucket: process.env.AWS_DEFAULT_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
        try {
            /** file 출력 예시
             * {
             fieldname: 'field1',
             originalname: '1645595956127.png',
             encoding: '7bit',
             mimetype: 'image/png'
             }
             */
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8').normalize();
            cb(null, `${file.fieldname}/${uuid()}.${file.originalname.split('.').pop()}`);
        } catch (e) {
            cb(e);
        }
    }
});

const upload = multer({ storage });

module.exports = function (fields) {
    if (!fields || !Array.isArray(fields)) {
        return upload.any();
    } else {
        fields = fields.map((item) => {
            return { name: item };
        });
    }
    return upload.fields(fields);
};
