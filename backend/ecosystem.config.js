const env = process.env.SERVICE_ENV || 'dev';
const projectName = 'mvpick';

const config = {
    dev: {
        name: `${projectName}-DEV-Express`,
        script: 'app.js',
        instances: '2',
        exec_mode: 'cluster',
        merge_logs: true,
        env: {
            NODE_ENV: 'development'
        },
        wait_ready: true,
        listen_timeout: 3000
    },
    prod: {
        name: `${projectName}-PROD-Express`,
        script: 'app.js',
        instances: '0',
        exec_mode: 'cluster',
        merge_logs: true,
        env: {
            NODE_ENV: 'production'
        },
        wait_ready: true,
        listen_timeout: 3000
    }
};


module.exports = {
    apps: [config[env]]
};
