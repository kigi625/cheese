<template>
<div id="quiz2">
    <div class="com_contain" v-if="step==0">
        <div class="number">Q2 / 5</div>
        <div class="question">
            다음 중 소젖으로 만든 치즈가 <strong>아닌</strong> 것은?
        </div>
        <div class="choice_box">
            <button class="choice" @click="checkAnswer(0)"
            :class="{'check' : isChecked === 0}">
                <i class="pi pi-check"></i>에멘탈 (Emmental)
            </button>
            <button class="choice" @click="checkAnswer(1)"
            :class="{'check' : isChecked === 1}">
                <i class="pi pi-check"></i>브리(Brie)
            </button>
            <button class="choice" @click="checkAnswer(2)"
            :class="{'check' : isChecked === 2}">
                <i class="pi pi-check"></i>로크포르(Roquefort)
            </button>
            <button class="choice" @click="checkAnswer(3)"
            :class="{'check' : isChecked === 3}">
                <i class="pi pi-check"></i>똠(Tomme)
            </button>
        </div>
        <button class="mainBtn1" @click="nextQustion()">정답 확인</button>
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
        <button class="choice check"><i class="pi pi-check"></i>로크포르(Roquefort)</button>
        <div class="explain">
            치즈를 분류할 때 가장 먼저 활용할 수 있는 기준은 <br>
            바로 어떤 가축의 젖을 이용해 만든 <br>
            치즈인지 살펴보는 것입니다. <br>
            포유류의 젖을 이용하여 만드는 치즈는 <br> 일찍이 가축화가 진행된 소, 염소, 양, 물소의 <br>
            젖이 가장 흔하게 이용되었습니다. <br>
            <strong>‘로크포르(Roquefort)’</strong>는 <strong>양젖</strong>으로 만든 <br>
            블루 치즈로 프랑스에서 처음으로 <br>
            원산지 통제 명칭(AOC) 인증을 받은 치즈입니다.
            
        </div>
        <img src="~public/img/quiz/2.jpg" alt="" class="explain_img">
        <button class="mainBtn1" @click="$router.push('/quiz3')">다음 문제<i class="pi pi-arrow-right"></i></button>
    </div>
</div>
</template>

<script setup>
definePageMeta({
    name: "Quiz2Page",
})
const step = ref(0); // 0: 문제, 1: 해설
const isChecked = ref(null); // 문제 보기 체크
const judgement = ref(true); // 문제 맞고 틀리고 판단

const quizStore = useQuizStore();
quizStore.setQuizData(1,false);
const checkAnswer = (no) => {
    isChecked.value = no;
    if(no == 2){
        judgement.value = true;
    }else{
        judgement.value = false;
    }
    quizStore.setQuizData(1,judgement.value);
}
const nextQustion = () => {
    if(isChecked.value == null){
        alert('정답을 선택해주세요');
        return;
    }
    step.value = 1;
}
</script>

<style lang="scss" scoped>
#quiz2{
    .explain_img{
        width: 100%;
        border-radius: $px12;
        margin: 24px 0;
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