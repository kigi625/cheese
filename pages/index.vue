<template>
<div id="main">
    <div class="com_contain">
        <img src="~public/img/key_visual.png" alt="">
        <button class="mainBtn1" @click="$router.push('/start')">치즈학교 입학하기<i class="pi pi-arrow-right"></i></button>
    </div>
    <Footer class="position" />

</div>
</template>

<script setup>
definePageMeta({
    name: "IndexPage",
})

</script>

<style lang="scss" scoped>
#main{
    background-color: $primary-50;
    /* height: calc(100vh - 196px); */
    position: relative;
    .com_contain{
        padding: 32px 16px 60px;
        /* overflow: auto; */
        min-height: calc(100vh - 72px);
    }
    img{
        width: 100%;
    }
    .mainBtn1{
        margin: 40px 0 0;
        width: 100%;
        padding: 14px;
        display: flex;
        gap: 4px;
        align-items: center;
        justify-content: center;
        i{
            font-size: 16px;
            /* margin-top: 4px;
            margin-left: 4px; */
            font-weight: 600;
        }
    }
    /* .position{
        position: absolute;
        bottom: 0;
        width: 100%;
    } */
}
</style>