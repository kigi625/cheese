<template>
<div id="quiz3">
    <div class="com_contain" v-if="step==0">
        <div class="number">Q3 / 5</div>
        <div class="question">
            다음 중 제조방법에 따른 분류와 <br> 그에 해당하는 치즈로 옳지 <strong>않은</strong> 연결은?
        </div>
        <div class="choice_box">
            <button class="choice" @click="isChecked=0"
            :class="{'check' : isChecked === 0}">
                <i class="pi pi-check"></i>
                <p>생치즈 – 프로마쥬 블랑(Fromage blanc)</p>
            </button>
            <button class="choice" @click="isChecked=1"
            :class="{'check' : isChecked === 1}">
                <i class="pi pi-check"></i>
                <p>흰색외피 연성치즈 – 리바로(Livarot)</p>
            </button>
            <button class="choice" @click="isChecked=2"
            :class="{'check' : isChecked === 2}">
                <i class="pi pi-check"></i>
                <p>푸른곰팡이 연성치즈 – 푸름므 당베르 <br>(Fourme d’Ambert)</p>
            </button>
            <button class="choice" @click="isChecked=3"
            :class="{'check' : isChecked === 3}">
                <i class="pi pi-check"></i>
                <p>가열 압착치즈 – 꽁떼(Comté)</p>
            </button>
        </div>
        <button class="mainBtn1" @click="step=1">정답 확인</button>
    </div>

    <div class="com_contain" v-if="step==1">
        <div class="judgement right" v-if="judgement">
            <img src="~public/img/right_check.png" alt="">
            <p>정답이예요!</p>
        </div>
        <div class="judgement wrong" v-else>
            <img src="~public/img/wrong.png" alt="">
            <p>앗, 정답이 아니에요!</p>

        </div>
        <div class="number">정답 확인</div>
        <button class="choice check"><i class="pi pi-check"></i>흰색외피 연성치즈 – 리바로(Livarot)</button>
        <div class="explain">
            더 세세히 치즈를 분류하는 데 <br>
            가장 널리 사용되는 기준은 <br>
            치즈의 제조 방법에 따른 분류입니다.<br>
            치즈는 제조하는 방식에 따라 <br>
            크게 7가지로 구분할 수 있습니다. <br>
            제일 먼저 자연 치즈와 가공 치즈로 <br>
            분류한 후,자연 치즈 내에서 숙성 여부, <br>
            가열 여부, 압착 여부와 사용된 곰팡이 균에 따라<br>
            총 6가지로 분류할 수 있습니다.<br>
            여기에서 <strong>리바로(Livarot) 치즈는 <br> 세척외피 연성치즈</strong>에 속합니다.
        </div>
        <img src="~public/img/quiz/3.png" alt="" class="explain_img">
        <button class="mainBtn1" @click="$router.push('/quiz4')">다음 문제<i class="pi pi-arrow-right"></i></button>
    </div>
</div>
</template>

<script setup>
definePageMeta({
    name: "Quiz3Page",
})
const step = ref(0); // 0: 문제, 1: 해설
const isChecked = ref(null); // 문제 보기 체크
const judgement = ref(false); // 문제 맞고 틀리고 판단

</script>

<style lang="scss" scoped>
#quiz3{
    .explain_img{
        width: 160px;
        margin: 24px auto;
    }
    .choice_box{
        display: flex;
        flex-direction: column;
    }
    .mainBtn1{
        width: 100%;
    }
}

</style>