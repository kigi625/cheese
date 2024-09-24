export default defineNuxtPlugin((_nuxtApp) => {
    const toast = useToast();
    const confirm = useConfirm();

    globalThis.$toast = function (text) {
        toast.add({severity: 'success', summary: 'Success', detail: text || '(Empty)', life: 3000});
    };
    globalThis.$toastError = function (text) {
        toast.add({severity: 'error', summary: 'Failure', detail: text || '(Empty)', life: 3000});
    };
    globalThis.$alert = function (...args) {
        const data = {
            message: '',
            accept: () => {
            }
        };
        if (args.length === 1) {
            if (typeof args[0] === 'string') {
                data.message = args[0];
            }
        } else if (args.length === 2) {
            if (typeof args[0] === 'string' && typeof args[1] === 'function') {
                data.message = args[0];
                data.accept = args[1];
            }
        }
        confirm.require({
            group: 'alert',
            message: data.message,
            header: 'Confirmation',
            acceptClass: 'p-button-secondary p-button-outlined',
            acceptLabel: 'Yes',
            closable: false,
            accept: data.accept
        });
    };
    globalThis.$confirm = function (...args) {
        const data = {
            message: '',
            accept: () => {
            }
        };
        if (args.length === 1) {
            if (typeof args[0] === 'string') {
                data.message = args[0];
            }
        } else if (args.length === 2) {
            if (typeof args[0] === 'string' && typeof args[1] === 'function') {
                data.message = args[0];
                data.accept = args[1];
            }
        }
        confirm.require({
            group: 'confirm',
            message: data.message,
            header: 'Confirmation',
            rejectClass: 'p-button-secondary p-button-outlined',
            rejectLabel: 'No',
            acceptClass: 'p-button-secondary p-button-outlined',
            acceptLabel: 'Yes',
            closable: false,
            accept: data.accept
        });
    };
});
