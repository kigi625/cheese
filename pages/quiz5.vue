<template>
<div id="quiz5">
    <div class="com_contain" v-if="step==0">
        <div class="number">Q5 / 5</div>
        <div class="question">
            다음 중 AOP 인증으로 보호하는 치즈와 <br> 그 원산지로 <strong>잘못</strong> 연결된 것은?
        </div>
        <div class="choice_box">
            <button class="choice" @click="checkAnswer(0)"
            :class="{'check' : isChecked === 0}">
                <i class="pi pi-check"></i>
                <p>꽁떼(Comté) – 사부아(Savoie)</p>
            </button>
            <button class="choice" @click="checkAnswer(1)"
            :class="{'check' : isChecked === 1}">
                <i class="pi pi-check"></i>
                <p>랑그르(Langres) – 샹파뉴(Champagne)</p>
            </button>
            <button class="choice" @click="checkAnswer(2)"
            :class="{'check' : isChecked === 2}">
                <i class="pi pi-check"></i>
                <p>블루 도베르뉴(Bleu d’Auvergne)<br> - 오베르뉴(Auvergne)</p>
            </button>
            <button class="choice" @click="checkAnswer(3)"
            :class="{'check' : isChecked === 3}">
                <i class="pi pi-check"></i>
                <p>리바로(Livarot) – 노르망디(Normandie)</p>
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
            <p>꽁떼(Comté) – 사부아(Savoie)</p>
        </button>
        <div class="explain">
            프랑스는 수백 년 동안 정통성 있는 치즈를 <br>
            생산하며 프랑스 전역의 다양한 떼루아와<br>
            기후를 반영하는 문화적 전통을 보존해 왔습니다.<br>
            노르망디의 너른 목초지부터 <br>
            피레네, 쥐라산맥의 험준한 습곡산지까지<br> 
            지역마다 자연을 닮은 정통 치즈를 <br>
            만날 수 있습니다.<br>
            AOP <strong>꽁떼(Comté)</strong> 치즈는 <br>
            프랑스와 스위스 사이의 쥐라산맥이 위치한 <br>
            <strong>프랑슈 꽁떼(Franche-Comté)</strong> 지방에서 탄생해<br>
            지금까지 전통을 이어오고 있습니다.
        </div>
        <img src="~public/img/quiz/5.jpg" alt="" class="explain_img">
        <img src="~public/img/quiz/5-1.png" alt="" class="explain_img">
        <button class="mainBtn1" @click="$router.push('/grade')">성적 확인<i class="pi pi-arrow-right"></i></button>
    </div>
</div>
</template>

<script setup>
definePageMeta({
    name: "Quiz5Page",
})
const step = ref(0); // 0: 문제, 1: 해설
const isChecked = ref(null); // 문제 보기 체크
const judgement = ref(true); // 문제 맞고 틀리고 판단
const quizStore = useQuizStore();
quizStore.setQuizData(4,false);
const checkAnswer = (no) => {
    isChecked.value = no;
    if(no == 0){
        judgement.value = true;
    }else{
        judgement.value = false;
    }
    quizStore.setQuizData(4,judgement.value);
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
#quiz5{
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