<template>
    <div>
        <NuxtLayout>
            <NuxtPage/>
            <Toast/>
            <ConfirmDialog class="alert-dialog" style="min-width: 250px" group="alert" :closable="false">
                <template #message="{message}">
                    <p style="white-space: pre-line">{{ message.message }}</p>
                </template>
            </ConfirmDialog>
            <ConfirmDialog class="confirm-dialog" style="min-width: 250px" group="confirm" :closable="false">
                <template #message="{message}">
                    <p style="white-space: pre-line">{{ message.message }}</p>
                </template>
            </ConfirmDialog>
        </NuxtLayout>
    </div>
</template>

<script setup>
</script>
<style lang="scss">
.alert-dialog {
    .p-confirm-dialog-reject {
        display: none;
    }
    .p-confirm-dialog-accept {
        .p-button-label {
            color: $primary;
        }
    }
}

.confirm-dialog {
    .p-dialog-footer {
        gap: 21px
    }
    .p-confirm-dialog-accept {
        .p-button-label {
            color: $primary;
        }
    }
}
</style>
