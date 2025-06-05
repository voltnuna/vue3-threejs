<template>
  <div class="userform">
    <form @submit.prevent="onSubmitEvent">
      <h1 class="title">LOGIN</h1>
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
import { onMounted, ref } from "vue";
import { useUserStore } from "@stores/userStore.ts";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");

const onSubmitEvent = async () => {
  await userStore
    .login(email.value, password.value)
    .catch(() => router.push("/workspace"));
};

onMounted(() => userStore.auth && router.push("/workspace"));
</script>

<style scoped lang="scss">
.title {
  text-align: center;
  margin: 1rem 0;
  font-size: 4.5rem;
}
.userform {
  @include display-flex(inline-flex, center);
  width: 100%;
  height: 100%;
  form {
    width: 25rem;
    box-sizing: border-box;
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
}
button {
  width: 24rem;
  padding: 1.1rem;
  font-size: 1.4rem;
  border-radius: 7px;
  background-color: #0f0f0f;
  color: #fff;
  @include display-flex(inline-flex, center);
}
</style>
