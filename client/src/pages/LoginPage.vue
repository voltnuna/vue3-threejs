<template>
  <div class="userform">
    <form @submit.prevent="onSubmitEvent">
      <h1 class="title">로그인</h1>
      <div>
        <input
          type="email"
          v-model="email"
          placeholder="email address"
          class="input input-md"
          autocomplete="username"
        />
      </div>
      <div>
        <input
          type="password"
          v-model="password"
          placeholder="password"
          class="input input-md"
          autocomplete="current-password"
        />
      </div>
      <button type="submit">LOGIN</button>
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

onMounted(() => {
  userStore.auth && router.push("/workspaces/general");

  watch(
    () => userStore.auth,
    () => {
      userStore.auth && router.push("/workspaces/general");
    }
  );
});

const onSubmitEvent = async () => {
  await userStore
    .login(email.value, password.value)
    .then(() => {
      router.push("/workspaces/general");
    })
    .catch(() => {
      alert("로그인 실패");
    });
};
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
