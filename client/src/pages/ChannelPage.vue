<template>
  <div class="container">
    <div class="head-area">#Channel-Name</div>
    <div class="body-area">
      <div class="chats">
        <div class="chat">
          <div>
            <img
              :src="gravatar.url('tester', { s: '30px', d: 'robohash' })"
              alt=""
            />
          </div>
          <div>
            <strong>닉네임</strong>
            <span>작성시간</span>
            <p>안녕하세요요요요</p>
            <button type="button" @click.prevent="">스레드보기</button>
          </div>
        </div>
      </div>
      <div class="threads"></div>
    </div>
    <div class="foot-area">
      <ul>
        <li><button type="button" @click.prevent>Bold</button></li>
        <li><button type="button" @click.prevent>Italic</button></li>
        <li><button type="button" @click.prevent>Strikethrough</button></li>
        <li><button type="button" @click.prevent>Imoji</button></li>
      </ul>
      <textarea name="chatbox" id="chatbox" row="5" col="50"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useChnStore } from "@stores/channelStore";
import { storeToRefs } from "pinia";
import gravatar from "gravatar";

const useChn = useChnStore();
const { channel } = storeToRefs(useChn);

const route = useRoute();
const wsName = ref("");
const chnName = ref("");

watchEffect(() => {
  let paramChn = route.params.channel as string;
  let paramWs = route.params.workspace as string;

  if (!paramChn || !paramWs) {
    const fullpath = route.fullPath.split("/");
    paramChn = fullpath[4]; // ['','workspaces','general','channel',':channel']
    paramWs = fullpath[2]; // ['','workspaces','general','channel',':channel']
    wsName.value = paramWs;
    chnName.value = paramChn;
  }
  if (paramChn) {
    useChn.getChannel(paramWs, paramChn).then(() => {});
  } else {
    console.log("No workspace name found.");
  }
});
</script>

<style scoped lang="scss">
.head-area {
  width: 100%;
  height: 5%;
  background-color: yellow;
}
.body-area {
  width: 100%;
  height: 80%;
  overflow-y: auto;
  padding: 2rem;
  background-color: #fff;
  line-height: 1.5;
}
.foot-area {
  width: 100%;
  height: 15%;
  border-top: 2px solid #ddd;
  textarea {
    width: 90%;
    height: 10rem;
  }
}
.profileimg {
  // @include display-flex(inline-flex, center, center);
  //width: 100%;
  color: #fff;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  img {
    border-radius: 50%;
  }
}
</style>
