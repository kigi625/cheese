import {useEncryptStore} from '~/stores/encrypt';

const csrfCookie = useCookie('_LHS_CSRF');
export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const encryptStore = useEncryptStore();
        if (encryptStore.csrfToken && csrfCookie.value) {
            return;
        }
        const res = await $fetch('/common/csrfToken');
        const {csrfToken} = res.data;
        if (csrfToken) {
            encryptStore.csrfToken = csrfToken;
        } else {
            console.error('CSRF 토큰이 응답에 포함되어 있지 않습니다.');
        }
    } catch (error) {
        console.error('CSRF 토큰 가져오기 실패:', error);
    }
});
