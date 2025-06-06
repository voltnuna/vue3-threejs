<template>
  <div class="userform">
    <form @submit.prevent="onSubmitEvent">
      <h1 class="title">회원가입</h1>
      <div>
        <input
          type="email"
          v-model="email"
          placeholder="email address"
          class="input input-md"
        />
      </div>
      <div>
        <input
          type="nickname"
          v-model="nickname"
          placeholder="nickname"
          class="input input-md"
        />
      </div>
      <div>
        <input
          type="password"
          v-model="password"
          placeholder="password"
          class="input input-md"
        />
      </div>
      <div>
        <input
          type="password"
          v-model="pwcheck"
          placeholder="password check"
          class="input input-md"
        />
      </div>
      <button type="submit">회원가입</button>
      <router-link to="/login">로그인하러가기</router-link>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@stores/userStore";
import router from "@/router";
// import { useRoute } from "vue-router";
// import { usePathStore } from "@stores/pathStore";

const userStore = useUserStore();
//const pathStore = usePathStore();
//const route = useRoute();

const email = ref("");
const nickname = ref("");
const password = ref("");
const pwcheck = ref("");

const onSubmitEvent = () => {
  if (onChkPassword()) {
    userStore
      .signup(email.value, nickname.value, password.value)
      .then(() => router.push("/login"));
  } else {
    alert("비밀번호가 다릅니다");
    password.value = "";
    pwcheck.value = "";
  }
};
const onChkPassword = () => password.value === pwcheck.value;

onMounted(() => {});
</script>

<style scoped lang="scss">
.userform {
  @include display-flex(inline-flex, center, flex-start);
  width: 100%;
  height: 100%;
  padding-top: 15rem;
  .title {
    text-align: center;
    margin: 3rem 0;
    font-size: 5.5rem;
  }

  form {
    width: 30rem;
    box-sizing: border-box;
  }
  .input {
    padding: 0.8rem;
    margin: 0.7rem 0;
    border-radius: 7px;

    &-md {
      width: 30rem;
      padding: 1.1rem;
      font-size: 1.8rem;
      border: 1px solid #615f5f;
    }
  }
  button {
    width: 30rem;
    margin: 0.7rem 0;
    padding: 1.5rem;
    font-size: 1.8rem;
    border-radius: 7px;
    background-color: #0f0f0f;
    color: #fff;
    @include display-flex(inline-flex, center);
  }
}
</style>
