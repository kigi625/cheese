<template>
    <div>
        <header>
            <img src="~public/img/logo.png" alt="" @click="$router.push('/')">
        </header>
        <body>
            <slot />
        </body>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
header{
    padding: 12px 16px;
    border: 1px solid $gray-200;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
    z-index: 1;
    img{
        width: 86px;
        margin: 0 auto;
    }
}
body{
    min-height: calc(100vh - 72px);
    padding-top: 72px;
    max-width: 768px;
    /* height: 100vh; */
    overflow: auto;
}
</style>
