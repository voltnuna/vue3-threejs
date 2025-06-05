<template>
  <ul class="ws-list">
    <li v-for="(item, index) in wslist" :key="index">
      <router-link :to="`/workspace/${item}`"
        ><img :src="gravatar.url(item, { s: '53px', d: 'initials' })" alt=""
      /></router-link>
    </li>
    <li>
      <button type="button" @click.prevent="addWorkspace"></button>
    </li>
  </ul>
  <div class="ws-sub">
    <div class="ws-sub__head">
      <h2>{{ wsname }}</h2>
      <button type="button">글작성</button>
    </div>
    <ul class="ws-sub__chn">
      <li></li>
    </ul>
    <ul class="ws-sub__dm">
      <li></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import gravatar from "gravatar";
import { useUserStore } from "@stores/userStore";
import { storeToRefs } from "pinia";

const store = useUserStore();
const { Workspaces } = storeToRefs(store);

const wsname = ref("");
const wslist = ref(["general"]);

const addWorkspace = () => {
  alert("add Workspace");
};

onMounted(() => {
  //  wslist.value.concat(Workspaces); //사용자 가입 workspace 목록 wslist에 추가
});
</script>

<style lang="scss" scoped>
.ws-list {
  position: fixed;
  top: 56px;
  left: 0;
  width: 8rem;
  height: 100%;
  background-color: #212121;
  border-right: 1px solid #474141;
  button {
    @include display-flex(flex, center, center);

    cursor: pointer;
    color: #fff;
    &::before {
      content: "+";
      width: 53px;
      height: 53px;
      line-height: 53px;
      border-radius: 50%;
      font-size: 3rem;
      background-color: grey;
    }
  }
  li {
    @include display-flex(flex, center);
    width: 100%;
    text-align: center;
    height: 8rem;
  }
  a {
    @include display-flex(inline-flex, center, center);
    padding: 2rem 2rem;
    width: 100%;
    cursor: pointer;
    img {
      border-radius: 50%;
    }
    color: #fff;
  }
}
.ws-sub {
  position: fixed;
  top: 56px;
  left: 80px;
  width: 26rem;
  height: 100%;
  background-color: #212121;
}
</style>
