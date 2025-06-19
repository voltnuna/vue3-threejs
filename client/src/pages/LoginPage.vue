<template>
  <div class="userform">
    <form @submit.prevent="onSubmitEvent">
      <h1 class="title">로그인</h1>
      <div>
        <input
          type="email"
          v-model="email"
          placeholder="email address"
          :class="['input', 'input-md', { errorform: emptyErr }]"
          autocomplete="username"
        />
      </div>
      <div>
        <input
          type="password"
          v-model="password"
          placeholder="password"
          autocomplete="current-password"
          :class="['input', 'input-md', { errorform: emptyErr }]"
        />
      </div>
      <div v-if="emptyErr" class="error-msg">아이디, 패스워드를 입력하세요</div>
      <div v-if="loginErr" class="error-msg">
        {{ userStore.loginErr }}
      </div>
      <button type="submit">로그인</button>
      <router-link to="/signup">회원가입하러가기</router-link>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "@stores/userStore.ts";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const email = ref("");
const password = ref("");
const emptyErr = ref(false);
const loginErr = ref(false);

const onSubmitEvent = () => {
  if (email.value !== "" && password.value !== "") {
    onlogin();
  } else {
    emptyErr.value = true;
  }
};

const onlogin = async () => {
  await userStore.login(email.value, password.value).then(() => {
    if (userStore.auth) {
      userStore.auth && router.push("/workspaces/general");
    } else {
      loginErr.value = true;
    }
  });
};

onMounted(() => {
  watch(
    () => userStore.auth,
    () => {
      userStore.auth && router.push("/workspaces/general");
    }
  );
});
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
      &:not(&.errorform) {
        border: 1px solid #615f5f;
      }
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
.error-msg {
  color: red;
  margin: 0.75rem 0;
  font-weight: 600;
}
.errorform {
  border: 2px solid rgba(255, 0, 0, 0.493);
  box-shadow: 0px 0px 5px 1px #ff000050;
  &::placeholder {
    font-weight: lighter;
    /* color: #c60102; */
  }
}
</style>
