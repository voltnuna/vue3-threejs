<template>
  <div class="navibar">
    <!-- S: Workspace List -->
    <div class="workspace-bar">
      <NaviListItem :lists="workspaces" />
    </div>
    <button
      type="button"
      class="addBtn lg"
      @click.prevent="onOpenWsModal"
    ></button>

    <!-- S: Channel List -->
    <div class="channel-bar">
      <div class="title-wrap__lg">
        <h2 class="channel-bar__title">{{ wsName }}</h2>
        <button type="button" @click.prevent="onOpenMemModal">멤버초대</button>
      </div>
      <div class="channel-bar__chn">
        <div class="title-wrap__md">
          <h3>채널 리스트</h3>
          <button class="" type="button" @click.prevent="onOpenChnModal">
            채널추가
          </button>
        </div>
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
  <div v-if="memberModal">
    <Modal
      modal-type="member"
      @modal-close="onCloseMemModal"
      @add-member="onInviteMember"
    />
  </div>
</template>

<script setup lang="ts" scoped>
//S: import lib
import { onMounted, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
//S: import store
import { useWsStore } from "@stores/wsStore";
import { useChnStore } from "@stores/channelStore";
import { useMemberStore } from "@stores/memberStore";
//S: import component
import Modal from "@/components/Modal.vue";
import NaviListItem from "@/components/NaviListItem.vue";

const route = useRoute();

//S: declare ref val
const wsName = ref("");

const wsModal = ref(false);
const chnModal = ref(false);
const memberModal = ref(false);

const wsStore = useWsStore();
const { workspaces } = storeToRefs(wsStore);

const memberStore = useMemberStore();

const chnStore = useChnStore();
const { channels } = storeToRefs(chnStore);

//S: Modal Control
const onCloseWsModal = () => (wsModal.value = false);
const onOpenWsModal = () => (wsModal.value = true);
const onCloseChnModal = () => (chnModal.value = false);
const onOpenChnModal = () => (chnModal.value = true);
const onCloseMemModal = () => (memberModal.value = false);
const onOpenMemModal = () => (memberModal.value = true);
//E:Modal Control

const onCreateWs = (name: string, url: string) => {
  wsStore.createWorkspace(name, url).then(() => {
    onCloseWsModal();
  });
};

const onCreateChn = (name: string) => {
  chnStore.createChannel(wsName.value, name).then(() => {
    onCloseChnModal();
  });
};

const onInviteMember = () => {
  memberStore.inviteWsMember(wsName.value).then(() => {
    onCloseMemModal();
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
    chnStore.fetchChannels(workspace);
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

  .workspace-bar {
    position: relative;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .title-wrap {
    &__lg {
      @include display-flex(flex, space-between, center);
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #474141;
    }
    &__md {
      @include display-flex(flex, space-between, center);
      padding-bottom: 0.8rem;
      border-bottom: 1px solid #474141;
    }
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

    &__chn {
      width: 100%;
      height: 100%;
      h3 {
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

.addBtn {
  @include display-flex(flex, center, center);
  width: 100%;
  cursor: pointer;
  color: #fff;
  &.lg::before {
    content: "+";
    width: 53px;
    height: 53px;
    line-height: 53px;
    font-size: 3rem;
    background-color: grey;
  }
  &.md::after {
    content: "+";
    width: 25px;
    height: 25px;
    line-height: 25px;
    font-size: 2rem;
    border-radius: 50%;
  }
}
</style>
