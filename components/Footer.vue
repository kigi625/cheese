<template>
<div id="footer">
    <div class="footer">
        <img src="~public/img/footer/footer1.png" alt="" style="width: 62px;">
        <img src="~public/img/footer/footer2.png" alt="" style="width: 150px;">
        <img src="~public/img/footer/footer3.png" alt="" style="width: 62px;">
    </div>
</div>
</template>

<script setup>
definePageMeta({
    name: "Footer",
})


</script>

<style lang="scss" scoped>
.footer{
    background-color: $gray-50;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid $gray-200;
    img{
        height: auto;
    }
}
</style>