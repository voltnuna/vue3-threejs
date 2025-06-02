<template>
  <h1>SignUP</h1>
  <form @submit.prevent="onSubmitEvent">
    <div><input type="email" placeholder="Email" v-model="email" /></div>
    <div><input type="text" placeholder="Nickname" v-model="nickname" /></div>
    <div>
      <input type="password" placeholder="Password" v-model="password" />
    </div>
    <div>
      <input type="password" placeholder="Password Check" v-model="pwcheck" />
    </div>
    <div>
      <button type="submit">SignUP</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
const email = ref();
const nickname = ref();
const password = ref();
const pwcheck = ref();

const onSubmitEvent = () => {
  alert("submit");
  console.log(email.value, password.value, pwcheck.value);

  axios
    .post("/api/users", {
      email: email.value,
      nickname: nickname.value,
      password: password.value,
    })
    .then((res) => {
      console.log("res", res.data);
    })
    .catch((err) => {
      console.log(err.resposne.data);
    });
};
</script>

<style scoped lang="scss"></style>
