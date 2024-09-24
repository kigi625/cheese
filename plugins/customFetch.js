class useCustomFetch {
    constructor(isMounted) {
        this.isMounted = isMounted;
    }

    async get(url, options) {
        options.method = 'GET';
        return await this.run(url, options);
    }

    async put(url, options) {
        options.method = 'PUT';
        return await this.run(url, options);
    }

    async post(url, options) {
        options.method = 'POST';
        return await this.run(url, options);
    }

    async delete(url, options) {
        options.method = 'DELETE';
        return await this.run(url, options);
    }

    async run(url, options) {
        let data, error, pending;
        if (this.isMounted.value) {
            try {
                const res = await $fetch(url, options);
                data = ref({data: res.data});
            } catch (e) {
                error = ref({
                    fatal: false,
                    statusCode: e.response.status,
                    statusMessage: e.response.statusText,
                    unhandled: false,
                    message: `${url} ${e.response.status} ${e.response.statusText}`,
                    data: {
                        code: e.response._data.code,
                        data: e.response._data.data,
                        message: e.response._data.message,
                        name: e.response._data.name,
                        status: e.response._data.status
                    }
                });
            }
        } else {
            const res = await useFetch(url, options);
            data = res.data;
            error = res.error;
            pending = res.pending;
        }

        if (error?.value) {
            throw new Error(`API request failed: ${error.value.data.message}`);
        }

        return {data, pending, error};
    }
}

export default defineNuxtPlugin(() => {
    const isMounted = ref(false);
    const nuxtApp = useNuxtApp();

    nuxtApp.hook('page:finish', () => {
        isMounted.value = true;
    });

    globalThis.useCustomFetch = new useCustomFetch(isMounted);
});
