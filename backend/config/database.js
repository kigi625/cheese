module.exports = {
    username: process.env.SEQUELIZE_USER,
    password: process.env.SEQUELIZE_PASS,
    database: process.env.SEQUELIZE_NAME,
    host: process.env.SEQUELIZE_HOST,
    port: process.env.SEQUELIZE_PORT,
    dialect: 'mysql',
    timezone: '+09:00',
    dialectOptions: {
        charset: 'utf8mb4',
        dateStrings: true,
        typeCast: true,
        supportBigNumbers: true
    },
    define: {
        timestamp: true
    },
    pool: {
        max: 200,
        min: 0
    },
    logging: process.env.NODE_ENV === 'development' ? function (str) {
        if (!/ALTER TABLE|CREATE TABLE|INFORMATION_SCHEMA|SHOW|DROP TABLE/.test(str)) {            
            if (process.env.DISABLE_QUERY_SINGLE_LINE == 1) {                
                console.info(str);
            } else {                
                console.info(str.replace(/\t|\n|\s{2,}/g, ' '));
            }
        }
    } : false
};
