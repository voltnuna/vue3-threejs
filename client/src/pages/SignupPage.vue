<template>
  <div class="userform">
    <form @submit.prevent="onSubmitEvent">
      <h1 class="title">SignUP</h1>
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
          type="password"
          v-model="password"
          placeholder="password"
          class="input input-md"
        />
      </div>
      <div>
        <input
          type="pwcheck"
          v-model="pwcheck"
          placeholder="password"
          class="input input-md"
        />
      </div>
      <button type="submit">SIGNUP</button>
      <router-link to="/login">로그인하러가기</router-link>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@stores/userStore";
import router from "@/router";
import { usePathStore } from "@stores/pathStore";

const userStore = useUserStore();
const pathStore = usePathStore();
const route = useRoute();

const email = ref();
const nickname = ref();
const password = ref();
const pwcheck = ref();

const onSubmitEvent = () => {
  const res = userStore.signup(email.value, nickname.value, password.value);
  console.log("@signup_onSubmitEvent 결과:", res);
};
const onChkPassword = () => {};

onMounted(() => {
  pathStore.getCurrentPath(route.path);
  userStore.nickname.length && router.push("/workspace");
});
</script>

<style scoped lang="scss">
.title {
  text-align: center;
  margin: 1rem 0;
  font-size: 4.5rem;
}
.userform {
  width: 100%;
  height: 100%;
  form {
    margin: 30rem auto 0;
    width: 25rem;
  }
}
button {
  width: 24rem;
  padding: 1.1rem;
  font-size: 1.4rem;
  border-radius: 7px;
  background-color: #0f0f0f;
  color: #fff;
  display: inline-flex;
  justify-content: center;
}
.input {
  padding: 0.8rem;
  margin: 0.5rem 0;
  border-radius: 7px;

  &-md {
    width: 24rem;
    padding: 1.1rem;
    font-size: 1.4rem;
    border: 1px solid #615f5f;
  }
}
</style>
