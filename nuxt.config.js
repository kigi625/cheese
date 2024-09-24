import {nodePolyfills} from 'vite-plugin-node-polyfills';

export default defineNuxtConfig({
    devtools: {enabled: false},
    ssr: false,
    devServer: {
        host: '0.0.0.0',
        port: 3000
    },
    buildModules: ['@nuxtjs/style-resources'],
    build: {
        extractCSS: true
    },
    modules: ['nuxt-primevue', '@pinia/nuxt', 'dayjs-nuxt', '@nuxt-alt/proxy'],
    proxy: {
        enableProxy: true,
        proxies: {
            '/api': {
                target: process.env.API_PROXY_URL || 'http://localhost:3001',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/image': {
                target: process.env.IMAGE_PROXY_URL,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/image/, '')
            }
        },
        debug: false
    },
    css: [
        'primeicons/primeicons.css',
        '@/assets/fonts/Pretendard.css',
        '@/assets/scss/common.scss',
        '@/assets/scss/reset.scss',
        '@/assets/css/tailwind.css',
        '@/assets/css/theme.css'
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/global.scss" as *;'
                }
            }
        },
        plugins: [
            nodePolyfills({
                includes: ['crypto'],
                globals: {
                    Buffer: true,
                    global: true,
                    process: true
                }
            })
        ]
    },
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp'
                }
            ]
        },
        meta: [{name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'}]
    },
    primevue: {
        usePrimeVue: true,
        components: {
            exclude: []
        }
    },
    components: true,
    materialIcons: {
        iconfont: 'MaterialIcons'
    },
    hooks: {
        listen() {
            if (process.send) {
                process.send('ready');
            }
        }
    },
    runtimeConfig: {
        public: {
            // 환경변수 정의
        }
    }
});
