import * as Yup from 'yup';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('yup', Yup);
});
