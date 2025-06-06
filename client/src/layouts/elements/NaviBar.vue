<template>
  <div class="navibar">
    <!-- S: Workspace List -->
    <div class="workspace-bar">
      <ListItem :lists="workspaces" />
    </div>
    <button
      type="button"
      class="addBtn"
      @click.prevent="onOpenWsModal"
    ></button>

    <!-- S: Channel List -->
    <div class="channel-bar">
      <div class="channel-bar__head">
        <h2 class="channel-bar__title">{{ wsName }}</h2>
        <button type="button" @click.prevent="onOpenChnModal">채널생성</button>
      </div>
      <div class="channel-bar__chn">
        <h3>채널 리스트</h3>
        <div v-for="(chn, idx) in channels" :key="idx">
          <router-link :to="`/workspaces/${wsName}/channel/${chn.name}`">
            <span class="router-link"> <span>#</span>{{ chn.name }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- S: Modal List -->
  <div v-if="wsModal">
    <Modal
      modal-type="workspace"
      @modal-close="onCloseWsModal"
      @add-workspace="onCreateWs"
    />
  </div>

  <div v-if="chnModal">
    <Modal
      modal-type="channel"
      @modal-close="onCloseChnModal"
      @add-channel="onCreateChn"
    />
  </div>
</template>

<script setup lang="ts" scoped>
import { onMounted, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useWsStore } from "@stores/wsStore";
import { useRoute } from "vue-router";
import Modal from "@/components/Modal.vue";
import ListItem from "@/components/ListItem.vue";

const route = useRoute();
const wsStore = useWsStore();
const { workspaces, channels } = storeToRefs(wsStore);
const wsName = ref("");

//S: Modal Control
const wsModal = ref(false);
const chnModal = ref(false);

const onCloseWsModal = () => (wsModal.value = false);
const onOpenWsModal = () => (wsModal.value = true);

const onCloseChnModal = () => (chnModal.value = false);
const onOpenChnModal = () => (chnModal.value = true);
//E:Modal Control

const onCreateWs = (name: string, url: string) => {
  wsStore.createWorkspace(name, url).then(() => {
    onCloseWsModal();
  });
};

const onCreateChn = (name: string) => {
  wsStore.createChannel(wsName.value, name).then(() => {
    onCloseChnModal();
  });
};

onMounted(() => wsStore.fetchWorkspaces());

watchEffect(() => {
  let workspace = route.params.workspace as string;
  // fallback: param이 없으면 path에서 추출
  if (!workspace) {
    const parts = route.fullPath.split("/");
    workspace = parts[2]; // ['','workspaces','general']
    wsName.value = workspace;
  }

  if (workspace) {
    wsStore.fetchChannels(workspace);
  } else {
    console.log("No workspace name found.");
  }
});
</script>

<style lang="scss" scoped>
.navibar {
  @include setPosition(fixed, 56px, none, 0);
  width: 8rem;
  height: 100%;
  background-color: #212121;
  border-right: 1px solid #474141;
  .addBtn {
    width: 100%;
    @include display-flex(flex, center, center);
    cursor: pointer;
    color: #fff;
    &::before {
      content: "+";
      width: 53px;
      height: 53px;
      line-height: 53px;
      font-size: 3rem;
      background-color: grey;
    }
  }
  .workspace-bar {
    position: relative;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .channel-bar {
    position: fixed;
    top: 56px;
    left: 80px;
    width: 26rem;
    height: 100%;
    background-color: #302e2e;
    color: #fff;
    padding: 1.5rem;
    &__title {
      text-transform: capitalize;
      font-size: 3.4rem;
      line-height: 3.4rem;
      text-align: center;
    }
    &__head {
      @include display-flex(flex, space-between, center);
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #474141;
    }
    &__chn {
      width: 100%;
      height: 100%;
      h3 {
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 1.5rem 0;
      }
      div {
        width: 100%;
      }
      a {
        display: flex;
        width: 100%;
        padding: 1rem 0;
        font-weight: 500;
        font-size: 1.6rem;
        justify-content: flex-start;
        color: #f0f0f0;
        font-weight: 500;
      }
    }
  }
}
</style>
