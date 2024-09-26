<template>
<div id="start">
    <div class="com_contain">
        <h1>
            🎉 <strong>정통 프랑스 치즈 학교에</strong><br>
            입학한 학생 여러분을 환영합니다!
        </h1>
        <h2>
            저희 학교에서는 학생 여러분의 입학과 함께 <br> 학년 편성 시험이 치러집니다.
        </h2>
        <h2>
            📝 시험 문제는 <span>총 다섯 개</span>입니다. 
        </h2>
        <h2>
            🎓프랑스 치즈에 대한 학생 여러분의 지식을 <br> 확인해 볼까요?
        </h2>
        <div class="button">
            <button class="mainBtn1" @click="$router.push('/quiz1')">시작하기</button>
        </div>
        <Footer class="position"/>
    </div>
</div>
</template>

<script setup>
definePageMeta({
    name: "StartPage",
})


</script>

<style lang="scss" scoped>
#start{
    background: url('~/public/img/key_visual.png') no-repeat top center / cover;
    /* height: calc(100vh - 72px); */
    width: 100%;
    .com_contain{
        height: calc(100vh - 72px);
        /* height: 100vh; */
        width: 100%;
        background-color: rgb(255 255 255 / 85%);
        padding: 76px 0px 60px;
        h1{
            font-size: 20px;
            line-height: 150%;
            padding: 0 16px;
            strong{
                font-weight: 800;
            }
        }
        h2{
            line-height: 150%;
            font-size: 16px;
            padding: 0 16px;
            span{
                color: $primary;
                font-weight: 800;
            }
        }
        .button{
            padding: 0 16px;
        }
        button{
            width: 100%;
            margin: 100px 0;
        }
    }
    .position{
        position: absolute;
        bottom: 0;
        width: 100%;
    }
}
</style>