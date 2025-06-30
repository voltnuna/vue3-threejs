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
    <div class="channel-bar">
      <div class="title-wrap__lg">
        <h2 class="channel-bar__title" :title="`${usePath.current_ws}`">
          {{ usePath.current_ws }}
        </h2>
        <button type="button" @click.prevent="onOpenMemModal">멤버초대</button>
      </div>
      <div class="channel-bar__chn">
        <div class="title-wrap__md">
          <h3>채널 리스트</h3>
          <button type="button" @click.prevent="onOpenChnModal">
            채널추가
          </button>
        </div>
        <!-- S: Channel List -->
        <div v-for="(chn, idx) in channels" :key="idx">
          <router-link
            :to="`/workspaces/${usePath.current_ws}/channel/${chn.name}`"
          >
            <span class="router-link"> <span>#</span>{{ chn.name }}</span>
          </router-link>
        </div>
        <!-- S: -->
        <div class="online pd-15">
          <ul>
            <li class="mg-b-10">🚀온라인🚀</li>
            <li
              class="pd-t-bt-5"
              v-for="(member, idx) in socket.onlieList"
              :key="idx"
            >
              <span class="online-signal"></span>
              <span class="online-name">{{ member }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom-bar">
        <div>{{ userStore.nickname }} 님</div>
        <button type="button" @click="onLogout">로그아웃</button>
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
  </div>
</template>

<script setup lang="ts">
// #################################################  S: import Libraries
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

// #################################################  S: import Stores
import { useUserStore } from "@stores/userStore";
import { useWsStore } from "@stores/wsStore";
import { useChnStore } from "@stores/channelStore";
import { useMemberStore } from "@stores/memberStore";
import { useSkStore } from "@stores/useSocketStore";
import { usePathStore } from "@stores/usePathStore";

// #################################################  S: import components
import NaviListItem from "@/components/NaviListItem.vue";
import Modal from "@/components/Modal.vue";

const route = useRoute();
const router = useRouter();

const usePath = usePathStore();
const socket = useSkStore();
const userStore = useUserStore();
const memberStore = useMemberStore();
const wsStore = useWsStore();
const chnStore = useChnStore();
const { workspaces } = storeToRefs(wsStore);
const { channels } = storeToRefs(chnStore);

const wsModal = ref(false);
const chnModal = ref(false);
const memberModal = ref(false);
const loginEmit = ref(false);

//S: Modal Control
const onCloseWsModal = () => (wsModal.value = false);
const onOpenWsModal = () => (wsModal.value = true);

const onCloseChnModal = () => (chnModal.value = false);
const onOpenChnModal = () => (chnModal.value = true);

const onCloseMemModal = () => (memberModal.value = false);
const onOpenMemModal = () => (memberModal.value = true);
//E:Modal Control

// ### S: onlieNickname.value = onlieList.value.map()join().split("@").shift();

//S: Router 변경될 때마다 param 값 추출
watch(
  () => [route.fullPath],
  () => {
    if (route.fullPath === "/") return;
    console.log("실행순서 확인 - route watch");
    usePath.getWorkspaceName(); //fetch workspace url

    if (userStore.id) {
      userStore.auth && wsStore.getMyWorkspace(userStore.id); //get my workspace list
    } else {
      console.log("로그인 먼저 하세용");
      router.push("/login");
    }

    if (usePath.current_ws) {
      chnStore.fetchChannels(usePath.current_ws); // get my channel list in current workspace
    }
  },
  { immediate: true }
);

watch(
  () => [chnStore.channels, usePath.current_ws],
  ([channelCount, currentWs]) => {
    if (!userStore.id || !currentWs || !channelCount) return;
    console.log("실행순서 확인 - socket");

    if (usePath.prev_ws !== usePath.current_ws) {
      console.log("이전 소켓 삭제");
      socket.sockets[usePath.current_ws]?.disconnect();
      delete socket.sockets[usePath.current_ws];
      console.log("소켓끊음");
      loginEmit.value = false;
    }

    if (usePath.current_ws) {
      socket.createNameSpace(usePath.current_ws);
      socket.getOnlineList(usePath.current_ws);
      console.log("소켓 생성😍", socket.sockets[usePath.current_ws]);
    }

    if (
      userStore.id &&
      chnStore.channels &&
      socket.sockets[usePath.current_ws] &&
      !loginEmit.value
    ) {
      socket.sockets[usePath?.current_ws].emit("login", {
        id: userStore?.email,
        channels: chnStore?.channels?.map((v) => v.id),
      });
      loginEmit.value = true;
      socket.getOnlineList(usePath.current_ws);

      console.log(
        "로그인 EMIT🤢",
        userStore.id,
        chnStore.channels,
        socket.sockets[usePath.current_ws]
      );
    }
  },
  { immediate: true }
);
const onLogout = () => {
  const res = userStore.logout();
  res
    .then(() => {
      router.push("/login");
    })
    .finally(() => {
      socket.sockets[usePath.current_ws]?.disconnect();
      delete socket.sockets[usePath.current_ws];
      console.log("로그아웃으로 인한 소켓 해제");
      loginEmit.value = false;
    });
  socket.getOnlineList(usePath.current_ws);
};
const onCreateWs = (name: string) => {
  wsStore.createWorkspace(name, name.toLowerCase()).then(() => {
    onCloseWsModal();
  });
};
const onCreateChn = (name: string) => {
  chnStore.createChannel(usePath.current_ws, name).then(() => {
    onCloseChnModal();
  });
};
const onInviteMember = (email: string) => {
  memberStore.inviteWsMember(usePath.current_ws, email).then(() => {
    onCloseMemModal();
  });
};
</script>

<style lang="scss" scoped>
.navibar {
  @include setPosition(fixed, 0px, none, 0);
  width: 8rem;
  height: 100%;
  background-color: #212121;
  border-right: 1px solid #474141;
}

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
  @include setPosition(fixed, 0px, none, 8rem);
  width: 26rem;
  height: 100%;
  background-color: #302e2e;
  color: #fff;
  padding: 1.5rem;

  &__title {
    text-transform: capitalize;
    font-size: 3.4rem;
    line-height: 3.4rem;
    text-align: left;
    width: 16.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__chn {
    width: 100%;
    height: 100%;
    h3 {
      @include display-flex(flex, flex-start, center);
      height: 3rem;
      margin: 1.5rem 0;
    }
    a {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      padding: 1rem 0;
      font-weight: 500;
      font-size: 1.6rem;
      color: #f0f0f0;
      font-weight: 500;
    }
  }
}

.bottom-bar {
  position: absolute;
  left: -1px;
  bottom: 0rem;
  width: 100%;
  height: 5rem;
  @include display-flex(flex, space-between, center);
  padding: 0 1.5rem;
  line-height: 1.25;
  color: #fff;
  font-size: 1.6rem;
  background-color: #212121;
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

.online {
  display: flex;
  border-radius: 7px;
  background-color: #212121;

  &-signal {
    display: inline-flex;
    background-color: #00e104;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    border: 1px solid #00e104a2;
    box-shadow: 0px 0px 4px #00e104;
  }
}
</style>
