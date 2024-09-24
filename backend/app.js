const readline = require('readline');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const csurf = require('csurf');

/* ===================================== *
 * [Dotenv]
 * ===================================== */
dotenv.config({ path: path.resolve('.env') });

/* ===================================== *
 * [Custom modules]
 * ===================================== */
const csrfProtection = csurf({ cookie: true });

require('./config');
require('./config/pino');
const morgan = require('./config/morgan');
const db = require('./models');
const seeders = require('./models/seeders');
const { promptConfirm } = require('./utils/common');

/* ===================================== *
 * [Router]
 * ===================================== */
const authHandler = require('./middlewares/authHandler');
const userHandler = require('./middlewares/userHandler');
const errorHandler = require('./middlewares/errorHandler');

const commonRouter = require('./routes/common');
//const userRouter = require('./routes/user');

/* ===================================== *
 * [Express]
 * ===================================== */
const app = express();

app.use(helmet());
app.use(express.json({
    limit: '300mb'
}));
app.use(express.urlencoded({
    limit: '300mb',
    parameterLimit: 100000,
    extended: true
}));
app.use(cookieParser());
app.use(morgan);
app.use(csrfProtection);

app.use(authHandler);
app.use('/common', commonRouter);
//app.use('/user', userHandler, userRouter);

app.use((req, res, next) => next(createError(404)));
app.use((error, req, res, next) => { // 에러 로그 설정
    if (error) {
        log.error({
            error: error.stack,
            req: {
                method: req.method,
                url: req.url,
                headers: req.headers,
                parameters: req.params,
                body: req.body,
                query: req.query,
            },
        }, 'HTTP request error');
        next(error);
    }
});
app.use(errorHandler);

/* ===================================== *
 * [Load Application]
 * ===================================== */
const startServer = async () => {
    try {
        serverLog('Loading...');
        if (!process.env.EXPRESS_PORT) {
            console.error('The application requires the EXPRESS_PORT environment variable to be set.');
            process.exit(1);
        }
        serverLog('Load database...');
        if (process.env.NODE_ENV === 'production' && process.env.SEQUELIZE_ROLE === 'master') {
            await db.sequelize.sync({
                alter: process.env.SEQUELIZE_ROLE === 'master'
            });
        } else {
            serverLog('* * * * 데이터베이스 싱크를 원하면 r 엔터 를 쳐주세요 * * * *');
            await db.sequelize.sync();
        }
        await seeders.run(db);
        serverLog(`Database connection successful. [DBName: ${db.sequelize.config.database}]`);
        const portNum = process.env.EXPRESS_PORT || 3000;
        const server = app.listen(portNum, '0.0.0.0', () => {
            serverLog(`Web server creation successful. [PortNum: ${server.address().port}]`);
            if (process.send) {
                process.send('ready');
            }
        });

        // 터미널 입력 감지
        if(process.env.NODE_ENV === 'development'){
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.on('line', async (input) => {
                if (input.trim().toLowerCase() === 'r') {
                    console.log('Prompting for sync...');
                    const confirm = await promptConfirm(`Do you want to execute Sequelize 'sync'?`);
                    if (confirm) {
                        serverLog('Sync database...');
                        await db.sequelize.sync({ alter: confirm });
                        console.log('Database sync completed. nodemon 사용중이면 파일 저장을 눌러주셈요');
                        
                    } else {
                        console.log('Database sync skipped.');
                    }
                    process.exit(0); // Exit to trigger a restart
                }
            });
        }

        process.on('SIGINT', () => {
            console.log('Received SIGINT. Exiting...');
            process.exit();
        });

        
    } catch (e) {
        serverLog('Load Error', e);
        await new Promise(
            setTimeout(() => {
                serverLog('Connection failed');
            }, 3000)
        );
        process.exit(1);
    }
};

startServer();