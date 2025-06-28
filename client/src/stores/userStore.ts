// userStore.ts
import { defineStore } from "pinia";
import type { IWorkspace } from "@/types/db"; // 타입은 type import로 불러오는게 더 명확
import { ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore(
  "user",
  () => {
    //S: state
    const id = ref(0);
    const nickname = ref("");
    const email = ref("");
    const auth = ref(false);
    const workspaces = ref<IWorkspace[]>([]);
    const loginErr = ref("");
    const clearUser = () => {
      id.value = 0;
      nickname.value = "";
      email.value = "";
      auth.value = false;
      workspaces.value = [];
    };

    //<--- S: actions --->
    const fetchUser = async () => {
      await axios
        .get("/api/users", { withCredentials: true })
        .then((res) => {
          if (typeof res.data === "boolean" && !res.data) {
            clearUser();
            localStorage.clear(); // persist된 내용도 정리할 수 있음
            console.log("@fetchUser_사용자 인증 실패", auth.value);
          } else {
            auth.value = true;
          }
        })
        .catch((err) => {
          console.dir("@fetchUser_사용자 인증 오류", err);
        });
    };

    const signup = async (
      _email: string,
      _nickname: string,
      _password: string
    ) => {
      await axios
        .post("/api/users", {
          email: _email,
          nickname: _nickname,
          password: _password,
        })
        .then((res) => {
          console.log("@회원가입 성공", res.data);
          alert(`가입을 축하드립니다!`);
        })
        .catch((err) => {
          //          console.log("@회원가입 실패", err);
          console.dir(err);
        });
    };

    const login = async (_email: string, _password: string) => {
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
          auth.value = true;
          console.log("@로그인 성공", res.data);
        })
        .catch((err) => {
          //          console.log("@로그인 실패", err.message);
          loginErr.value = err.response.data;
          console.dir(err);
        });
    };

    const logout = async () => {
      await axios
        .post("/api/users/logout", null, { withCredentials: true })
        .then((res) => {
          clearUser();
          localStorage.clear();
        })
        .catch((err) => {
          console.dir(err);
        });
    };
    //<--- E: actions --->

    return {
      fetchUser,
      logout,
      login,
      signup,
      id,
      nickname,
      email,
      auth,
      loginErr,
    };
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
