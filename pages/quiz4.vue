<template>
<div id="quiz4">
    <div class="com_contain" v-if="step==0">
        <div class="number">Q4 / 5</div>
        <div class="question">
            노란 배경의 붉은색 별 라벨의 ‘AOP’ 인증 제도의 풀네임으로 맞는 것은?
        </div>
        <div class="choice_box">
            <button class="choice" @click="checkAnswer(0)"
            :class="{'check' : isChecked === 0}">
                <i class="pi pi-check"></i>
                <p>Appellation d’Origine Propre <br>
                    (원산지 고유 명칭)</p>
            </button>
            <button class="choice" @click="checkAnswer(1)"
            :class="{'check' : isChecked === 1}">
                <i class="pi pi-check"></i>
                <p>Appellation d’Origine Préservée <br>
                    (원산지 보존 명칭)</p>
            </button>
            <button class="choice" @click="checkAnswer(2)"
            :class="{'check' : isChecked === 2}">
                <i class="pi pi-check"></i>
                <p>Appellation d’Origine Protégée<br>
                    (원산지 보호 명칭)</p>
            </button>
            <button class="choice" @click="checkAnswer(3)"
            :class="{'check' : isChecked === 3}">
                <i class="pi pi-check"></i>
                <p>Appellation d’Origine Produite<br>
                    (원산지 생산 명칭)</p>
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
        <button class="choice check">
            <i class="pi pi-check"></i>
            <p>Appellation d’Origine Protégée <br>
                (원산지 보호 명칭)</p>
        </button>
        <div class="explain">
            프랑스 치즈와 관련된 인증 제도를 이해하는 것은 <br> 미식 세계의 보물 지도를 해석하는 것과 같아서 <br>
            이를 통해 각 치즈의 탄생지, 환경과 역사에 대한 <br>
            보석 같은 지식을 만나게 됩니다.<br>
            유럽연합의 <strong>AOP(원산지 보호 명칭)</strong> 제도는 <br>치즈 외에도 다양한 농산품, 식료품 분야에서<br> 소비자의 가이드 역할을 하며 지리적 진정성과<br> 위대한 유산 보존에 힘쓰고 있습니다.
        </div>
        <img src="~public/img/quiz/4.png" alt="" class="explain_img">
        <button class="mainBtn1" @click="$router.push('/quiz5')">다음 문제<i class="pi pi-arrow-right"></i></button>
    </div>
</div>
</template>

<script setup>
definePageMeta({
    name: "Quiz4Page",
})
const step = ref(0); // 0: 문제, 1: 해설
const isChecked = ref(null); // 문제 보기 체크
const judgement = ref(true); // 문제 맞고 틀리고 판단
const quizStore = useQuizStore();
quizStore.setQuizData(3,false);
const checkAnswer = (no) => {
    isChecked.value = no;
    if(no == 2){
        judgement.value = true;
    }else{
        judgement.value = false;
    }
    quizStore.setQuizData(3,judgement.value);
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
#quiz4{
    .explain_img{
        width: 158px;
        border-radius: $px12;
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