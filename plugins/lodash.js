import lodash from 'lodash';

export default defineNuxtPlugin(() => {
    globalThis._ = lodash;
});
