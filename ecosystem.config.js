const env = process.env.SERVICE_ENV || 'dev';
const projectName = 'mvpick';

const config = {
    dev: {
        name: `${projectName}-DEV-Nuxt`,
        script: './.output/server/index.mjs',
        args: 'start',
        instances: '2',
        exec_mode: 'cluster',
        merge_logs: true,
        wait_ready: true,
        listen_timeout: 3000,
        env: {
            HOST: '0.0.0.0',
            PORT: 3000
        }
    },
    prod: {
        name: `${projectName}-PROD-Nuxt`,
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start',
        instances: '2',
        exec_mode: 'cluster',
        merge_logs: true,
        wait_ready: true,
        listen_timeout: 3000
    }
};

module.exports = {
    apps: [config[env]]
};
