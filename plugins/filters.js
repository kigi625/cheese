export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.globalProperties.$filters = {
        // YYYY-MM-DD
        convertYMD(value) {
            if (!value) {
                return '-';
            }
            if (!(value instanceof Date)) {
                value = new Date(value);
            }
            const year = value.getFullYear();
            const month = (value.getMonth() + 1).toString().padStart(2, '0');
            const date = value.getDate().toString().padStart(2, '0');

            return `${year}-${month}-${date}`;
        },
        // YYYY-MM-DD HH:mm
        convertYMDHM(value) {
            if (!value) {
                return '-';
            }
            if (!(value instanceof Date)) {
                value = new Date(value);
            }
            const year = value.getFullYear();
            const month = (value.getMonth() + 1).toString().padStart(2, '0');
            const date = value.getDate().toString().padStart(2, '0');
            const hours = value.getHours().toString().padStart(2, '0');
            const minutes = value.getMinutes().toString().padStart(2, '0');

            return `${year}-${month}-${date} ${hours}:${minutes}`;
        },
        // 숫자 콤마
        formatNumber(value) {
            if (!value) {
                return '-';
            }

            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    };
});
