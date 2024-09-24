import {ofetch} from 'ofetch';

const abortController = new AbortController();

export default defineNuxtPlugin((_nuxtApp) => {
    globalThis.$fetch = ofetch.create({
        async onRequest({request, options}) {
            try {
                const isApiRequest = !request.startsWith('/_nuxt/');
                if (isApiRequest) {
                    const encryptStore = useEncryptStore();

                    options.baseURL = '/api';
                    options.headers = {...options.headers};
                    options.headers['X-CSRF-TOKEN'] = encryptStore.csrfToken;
                    options.originalUrl = request;
                }
            } catch (e) {
                console.error('onRequest', e);
                // 요청 오류 시 종료함
                options.signal = abortController.signal;
            }
        },
        onRequestError({error}) {
            // console.error("error", error);
        },
        onResponse({response}) {
            return response;
        },
        async onResponseError({request, response, options}) {
            try {
                if (
                    response._data.code === 'TOKEN_EXPIRED' ||
                    response._data.code === 'TokenExpiredError' ||
                    response._data.code === 'NOT_FOUND_JWT'
                ) {
                    // 토큰 관련 처리
                }
            } catch (e) {
                console.error('onResponseError', e);
            }
        }
    });
});
