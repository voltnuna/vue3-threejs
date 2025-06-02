// userStore.ts
import { defineStore } from "pinia";
import type { IUser } from "@/types/db"; // 타입은 type import로 불러오는게 더 명확

export const useUserStore = defineStore("user", {
  state: (): IUser => ({
    id: 0,
    nickname: "",
    email: "",
    Workspaces: [],
  }),

  getters: {
    workspaceCount: (state) => state.Workspaces?.length,
  },

  actions: {
    setUser(user: IUser) {
      this.id = user.id;
      this.nickname = user.nickname;
      this.email = user.email;
      this.Workspaces = user.Workspaces;
    },
    resetUser() {
      this.id = 0;
      this.nickname = "";
      this.email = "";
      this.Workspaces = [];
    },
  },
});

/* 
 defineStore(스토어ID, {옵션}) 형식
 state: 반응형 데이터 ==> 관리할 데이터들 선언(변수)
 getters: 읽기 전용, computed 역할 state의 값을 조합하거나 계산해서 새로 파생된 값이 필요할 때. 예: 로그인 여부, 채팅 정렬, 필터링된 목록 등.
 actions: methods 역할. state를 변경하거나, 비동기 작업(예: API 호출)을 처리합니다.

 getter에서는 절대 state를 직접 바꾸지 말고, action에서 바꾼다.
*/

/*
 id: number;
  nickname: string;
  email: string;
  Workspaces: IWorkspace[];
*/
