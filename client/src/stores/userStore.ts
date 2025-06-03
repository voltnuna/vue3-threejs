// userStore.ts
import { defineStore } from "pinia";
import type { IUser, IWorkspace } from "@/types/db"; // 타입은 type import로 불러오는게 더 명확
import { computed, ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore(
  "user",
  () => {
    //S: state
    const id = ref(0);
    const nickname = ref("");
    const email = ref("");
    const Workspaces = ref<IWorkspace[] | undefined>([]);

    //S: getter (computed처럼 사용)
    //    const loginedUser = computed(() => email.value);

    //<--- S: actions --->
    const signup = (_email: string, _nickname: string, _password: string) => {
      const isSuccess = ref(false);
      axios
        .post("/api/users", {
          email: _email,
          nickname: _nickname,
          password: _password,
        })
        .then((res) => {
          id.value = res.data.id;
          nickname.value = res.data.nickname;
          email.value = res.data.email;
          isSuccess.value = true;
        })
        .catch((err) => {
          console.log("@userStore_signup_action: 회원가입 실패", err);
          isSuccess.value = false;
        });
      return isSuccess.value;
    };

    const login = async (_email: string, _password: string) => {
      const isSuccess = ref(false);
      await axios
        .post(
          "/api/users/login",
          {
            email: _email,
            password: _password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          id.value = res.data.id;
          nickname.value = res.data.nickname;
          email.value = res.data.email;
          isSuccess.value = true;
          console.log("Store 로그인 결과", isSuccess.value);
        })
        .catch((err) => {
          console.log("@userStore_login_action:로그인 실패", err);
          isSuccess.value = false;
        });
      return isSuccess.value;
    };

    const logout = () => {
      axios
        .post("/api/users/logout", null, { withCredentials: true })
        .then((res) => {
          id.value = 0;
          nickname.value = "";
          email.value = "";
          Workspaces.value = [];

          console.log("LOGOUT", res.data);
        })
        .catch((err) => {
          console.log("@userStore_logout_action: logout 실패", err.status);
          // if (err.status === 401) {
          //   id.value = 0;
          //   nickname.value = "";
          //   email.value = "";
          //   Workspaces.value = [];
          // } 로그인 완성되면 삭제
        });
    };
    //<--- E: actions --->

    return { logout, login, signup, nickname };
  },
  {
    persist: true, // ✅ localStorage 저장 활성화
  }
);

/* 
 defineStore(스토어ID, {옵션}) 형식
 state: 반응형 데이터 ==> 관리할 데이터들 선언(변수)
 getters: 읽기 전용, computed 역할 state의 값을 조합하거나 계산해서 새로 파생된 값이 필요할 때. 예: 로그인 여부, 채팅 정렬, 필터링된 목록 등.
 actions: methods 역할. state를 변경하거나, 비동기 작업(예: API 호출)을 처리합니다.
 getter에서는 절대 state를 직접 바꾸지 말고, action에서 바꾼다.
*/
