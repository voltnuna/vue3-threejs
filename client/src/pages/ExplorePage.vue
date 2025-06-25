<template>
  <div class="container">
    <div class="bigtitle">
      <h2>Welcom VueRek</h2>
    </div>
    <div class="explore-area">
      <!--  -->
      <div v-for="lab in [{ name: 'HI' }]" class="laboratory" @click.prevent="">
        <div class="desc">
          <div>
            <h3>{{ lab.name }}</h3>
            <p>{{ lab.name }}</p>
          </div>
        </div>
      </div>
      <ThreeScene />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watchEffect } from "vue";
import { useUserStore } from "@stores/userStore";
import ThreeScene from "@components/ThreeScene/ThreeScene.vue";
import { useRoute } from "vue-router";
import { useChnStore } from "@stores/channelStore";

import { Socket } from "socket.io-client";
import { useSkStore } from "@stores/useSocketStore";
const socket = useSkStore();
const mySocket = ref<Socket | undefined>(undefined);

const route = useRoute();
const wsName = ref("");
const chnName = ref("");

const userStore = useUserStore();
const useChn = useChnStore();

watchEffect(() => {
  let paramChn = route.params.channel as string;
  let paramWs = route.params.workspace as string;

  wsName.value = paramWs;
  chnName.value = paramChn;

  if (!paramChn || !paramWs) {
    const fullpath = route.fullPath.split("/");
    paramChn = fullpath[4];
    paramWs = fullpath[2];
    wsName.value = paramWs;
    chnName.value = paramChn;
    mySocket.value = socket.createNameSpace(wsName.value);
  } else {
    mySocket.value = socket.createNameSpace(wsName.value);
  }

  //로그인하면 SOCKET에  LOGIN EMIT
  if (userStore.id && useChn.channels && mySocket?.value?.id) {
    socket.emitLogin(
      userStore.email,
      useChn.channels?.map((v) => v.id),
      wsName.value
    );
  }
});

onMounted(() => {
  userStore.id && userStore.myWorkspace(userStore.id);
  if (wsName.value) {
    mySocket.value = socket.createNameSpace(wsName.value);
  }
});
</script>

<style lang="scss" scoped>
.bigtitle {
  display: block;
  width: 100%;
  font-size: 3rem;
  text-align: left;
  font-weight: 800;
  h2 {
    font-size: 3.5rem;
    line-height: 1;
  }
}
.explore-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow-y: auto;
  align-items: flex-start;

  .laboratory {
    position: relative;
    width: 35rem;
    height: 23rem;
    overflow: hidden;
    border: 1px solid rgba(11, 19, 43, 0.5);
    border-radius: 10px;
    background: url("../assets/images/thumb1.jpg") center/cover no-repeat;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    margin: 1rem;

    .desc {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      color: #fff;
      font-weight: 500;

      div {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 1rem;
        color: #fff;
        overflow: hidden;
        h3 {
          font-size: 3rem;
        }
        p {
          font-size: 1.7rem;
          margin: 1rem;
        }
      }
    }
    &:hover {
      .desc {
        background-color: rgba(0, 0, 0, 0.308);
        transition: 0.5s;
        cursor: pointer;
      }
      border: 1px solid #13131370;
      box-shadow: 1px 0 20px 0 rgba(0, 0, 0, 0.3);
      transition: 0.5s;
    }
  }
}
</style>
