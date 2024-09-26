import { defineStore } from 'pinia';

export const useQuizStore = defineStore('quiz', {
    state: () => ({
        quizData: JSON.parse(localStorage.getItem('quizData')) || [false,false,false,false,false]
    }),
    actions: {
        async setQuizData(no, check) {
            this.quizData[no] = check;
            this.saveToLocalStorage();
        },
        saveToLocalStorage() {
            localStorage.setItem('quizData', JSON.stringify(this.quizData));
        }
    }
});