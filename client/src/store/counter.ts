import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

/* 
 defineStore(스토어ID, 옵션) 형식
 state: 반응형 데이터
 getters: computed 역할
 actions: methods 역할
*/
