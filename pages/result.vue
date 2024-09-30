<template>
<div id="result">
    <div class="com_contain">
        <h1>결과 조회</h1>

        <div class="result_box">
            <dl>
                <dt>1. 신입생 </dt>
                <dd>{{ result.data.result.beginer }} 명</dd>
            </dl>
            <dl>
                <dt>2. 재학생 </dt>
                <dd>{{ result.data.result.student }} 명</dd>
            </dl>
            <dl>
                <dt>3. 졸업생 </dt>
                <dd>{{ result.data.result.graduate }} 명</dd>
            </dl>
            <dl class="total">
                <dt>총합</dt>
                <dd>{{ total }} 명</dd>
            </dl>
        </div>
    </div>

</div>
</template>

<script setup>
definePageMeta({
    name: "ResultPage",
})

const { data: result } = await useFetch('/api/common/result');
const total = ref(0);   

onMounted(() => {
    total.value = result.value.data.result.beginer + result.value.data.result.student + result.value.data.result.graduate;
});
</script>

<style lang="scss" scoped>
#result{
    h1{
        font-size: $px20;
        line-height: 150%;
        font-weight: 800;
        color: $gray-800;
        margin: 0;
    }
    .result_box{
        padding: 32px 0;
        background-color: $gray-50;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin-top: 40px;
        border: 1px solid $gray-200;
        dl{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            gap: 16px;
            dt{
                font-size: 18px;
                color: $gray-800;
                line-height: 150%;
            }
            dd{
                font-size: 20px;
                color: $primary;
                font-weight: 800;
                line-height: 150%;
                margin: 0;
            }
        }
        .total{
            border-top: 1px solid $gray-300;
            padding-top: 24px;
            dd{
                color: $gray-950;
            }
        }
    }
}
</style>