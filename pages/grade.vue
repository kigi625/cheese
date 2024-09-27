<template>
<div id="grade">
    <div class="com_contain">
        <img src="~public/img/logo.png" alt="">
        
        <div class="grade_box" v-if="gradeStatus==1">
            <div class="wrap">
                <p>{{score}}문제 맞혔어요! 👏🏻</p>
                <h3>Lv.1 신입생</h3>
            </div>
            <img src="~public/img/grade1.png" alt="">
        </div>
        <div class="grade_box" v-if="gradeStatus==2">
            <div class="wrap">
                <p>{{score}}문제 맞혔어요! 👏🏻</p>
                <h3>Lv.2 재학생</h3>
            </div>
            <img src="~public/img/grade2.png" alt="">
        </div>
        <div class="grade_box" v-if="gradeStatus==3">
            <div class="wrap">
                <p>문제를 모두 맞혔어요! 👏🏻</p>
                <h3>Lv.3 졸업생</h3>
            </div>
            <img src="~public/img/grade3.png" alt="">
        </div>

        <div class="contents_box">
            <div class="contents">
                🎉 <span class="ft_15">프랑스 치즈 학교 {{ gradeStatus === 1 ? '신입생' : gradeStatus === 2 ? '재학생' : '졸업생' }}</span>이 된 것을 축하합니다! <br>
                🎁 첫 등교 기념으로 <span class="ft_16">미니 치즈 나이프</span>를 드립니다. <br>
                🏫 학교에서 정통 치즈 수업과 다양한 창의적 체험활동에 <br> 참여하고 정통 치즈 모범생이 되어 볼까요?
            </div>
            <img src="~public/img/school.png" alt="">
        </div>
    </div>
    <Footer class="position"/>
</div>
</template>

<script setup>
definePageMeta({
    name: "GradePage",
})
const gradeStatus = ref(0)
const quizStore = useQuizStore();
const score = ref(0);

onMounted(() => {
    score.value = quizStore.quizData.filter(Boolean).length;
    //grade 는 score 가 0 ~ 2 는 1 , 3 ~ 4 는 2 , 5 는 3
    gradeStatus.value = score.value < 3 ? 1 : score.value < 5 ? 2 : 3;
})
</script>

<style lang="scss" scoped>
#grade{
    /* position: relative; */
    .com_contain{
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 0;
        height: calc(100vh - 72px);
        /* height: 100vh; */
        >img{
            width: 180px;
            margin: 0 auto;
        }
        .grade_box{
            display: flex;
            margin: 32px 0;
            padding: 0 16px;
            .wrap{
                width: 100%;
                p{
                    font-size: $px14;
                    color: $gray-500;
                    line-height: 130%;
                    letter-spacing: 1.4px;
                    margin: 0;
                    padding-top: 12px;
                }
                h3{
                    color: $primary;
                    font-size: 20px;
                    font-weight: 800;
                    line-height: 150%; /* 30px */
                    letter-spacing: 2px;
                    margin: 0;
                }
            }
            >img{
                height: 75px;
            }
        }
        .contents_box{
            background: linear-gradient(0deg, #FDF1F2 31.04%, #FFF 108.52%);
            padding: 0 16px 40px;
            height: calc(100vh - 340px);
            /* overflow: auto; */
            /* height: 100%; */
            .contents{
                line-height: 150%;
                color: $gray-800;
                font-size: 14px;
                .ft_15{
                    font-size: 15px;
                    line-height: 150%;
                    letter-spacing: 0.7px;
                    font-weight: 500;
                }
                .ft_16{
                    font-size: 16px;
                    line-height: 150%;
                    letter-spacing: 0.7px;
                    font-weight: 800;
                }
                p{
                    margin: 0;
                    font-weight: 500;
                }
            }
            >img{
                width: 100%;
                margin-top: 40px;
            }
        }
    }
    /* .position{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0;
    } */
}
</style>