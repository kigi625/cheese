<template>
    <div class="error-container">
        <div class="error-content" v-if="error.statusCode === 404">
            <div class="error-code">Oops!</div>
            <div class="divider"></div>
            <div class="error-message">Page not found.</div>
        </div>
        <div class="error-content" v-else>
            <div class="error-code">Oops!</div>
            <div class="divider"></div>
            <div class="error-message">An unknown error occurred.</div>
        </div>
        <button
            class="home-button"
            @click="onClickGoHome"
        >
            Home
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    error: Object
});

onMounted(() => {
    console.error(props.error);
});

const onClickGoHome = () => {
    location.href = '/';
};

</script>

<style lang="scss" scoped>
.error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    height: 100vh;

}

.error-content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    color: $primary;
}

.error-code {
    font-size: 5em;
    font-weight: bold;
}

.divider {
    border-left: 2px solid $primary;
    margin: 0 20px;
    height: 60px;
}

.error-message {
    font-size: 1.5em;
}

.home-button {
    padding: 10px 20px;
    font-size: 1em;
    text-transform: uppercase;
    border: none;
    background-color: $primary;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 200px; /* 버튼의 너비 설정 */
}

.home-button:hover {
    background-color: $primary-300;
}

@media (max-width: 600px) {
    .error-code {
        font-size: 3em;
    }
    .divider {
        height: 40px;
        margin: 0 10px;
    }
    .error-message {
        font-size: 1em;
    }
}
</style>
