<template>
  <div class="container">
    <div class="head-area">
      #{{ chnName }} 채널
      <button type="button" @click.prevent="onOpenMemModal">멤버 초대</button>
    </div>
    <div class="body-area" ref="scrollarea">
      <!-- ### S: -->
      <div class="chat-wrap">
        <div
          v-for="item in chats"
          :key="item.id"
          :class="[
            { chat: item.User.nickname !== useUser.nickname },
            { 'chat me': item.User.nickname === useUser.nickname },
          ]"
        >
          <div class="chat__userinfo">
            <!-- robohash, wavatar, color -->
            <img
              :src="gravatar.url(item.User.email, { s: '50px', d: 'retro' })"
              alt=""
            />
            <strong>{{ item.User.nickname }}</strong>
          </div>
          <div class="chat__content">
            <p>{{ item.content }}</p>
            <span>{{ item.createdAt }}</span>
          </div>
        </div>
      </div>
      <!-- ### E: -->
    </div>
    <div class="foot-area">
      <ul class="utils__txtcontrol">
        <li>
          <button type="button" @click.prevent="">Bold</button>
        </li>
        <li>
          <button type="button" @click.prevent="">Italic</button>
        </li>
        <li>
          <button type="button" @click.prevent="">Strikethrough</button>
        </li>
      </ul>
      <form class="utils__chats" @submit.prevent="onSubmitChats">
        <textarea
          v-model="chatMessage"
          @keypress.enter="onSubmitChats"
          name="chatbox"
          id="chatbox"
          row="5"
          col="45"
        ></textarea>
        <button type="submit">전송</button>
      </form>
    </div>

    <!-- ### S: Invite Channel Member Modal -->
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
import { ref, watch, watchEffect, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useChnStore } from "@stores/channelStore";
import { useChatStore } from "@stores/chatStore";
import { useUserStore } from "@stores/userStore";
import Modal from "@components/Modal.vue";
import gravatar from "gravatar";
import { storeToRefs } from "pinia";
import { useSkStore } from "@stores/useSocketStore";
const socket = useSkStore();

const useChat = useChatStore();
const useUser = useUserStore();
const useChn = useChnStore();
const { chats } = storeToRefs(useChat);

const route = useRoute();
const wsName = ref("");
const chnName = ref("");
const chatMessage = ref("");

// ### S: Modal
const memberModal = ref(false);
const onCloseMemModal = () => (memberModal.value = false);
const onOpenMemModal = () => (memberModal.value = true);
// ### E: Modal

const scrollarea = ref<HTMLElement | null>(null);

watch(
  // 메시지 바뀔 때마다 스크롤 아래로
  () => chats.value?.length,
  async () => {
    await nextTick(); // DOM 업데이트 이후에 실행되도록함
    if (scrollarea.value) {
      scrollarea.value.scrollTop = scrollarea.value.scrollHeight;
    }
  },
  { deep: true }
);

watchEffect(() => {
  let paramChn = route.params.channel as string;
  let paramWs = route.params.workspace as string;
  wsName.value = paramWs;
  chnName.value = paramChn;

  if (!paramChn || !paramWs) {
    const fullpath = route.fullPath.split("/");
    paramChn = fullpath[4]; // ['','workspaces','general','channel',':channel']
    paramWs = fullpath[2]; // ['','workspaces','general','channel',':channel']
    wsName.value = paramWs;
    chnName.value = paramChn;
    useChat.getChat(wsName.value, chnName.value);
  }
  if (paramChn) {
    useChn.getChannel(paramWs, paramChn);
    useChat.getChat(wsName.value, chnName.value);
  }
});

const onInviteMember = (email: string) => {
  useChn.inviteMember(wsName.value, chnName.value, email).then(() => {
    memberModal.value = false;
  });
};

const onSubmitChats = () => {
  if (chatMessage.value !== "") {
    useChat
      .sendChat(wsName.value, chnName.value, chatMessage.value)
      .then(() => {
        chatMessage.value = "";
      });
  }
};
watch(
  () => [socket.sockets[wsName.value], useChat.chats],
  () => {
    socket.sockets[wsName.value].on("message", () => {
      console.log("on message");
      useChat.getChat(wsName.value, chnName.value);
    });
    return () => {
      socket.sockets[wsName.value].off("message", () => {
        console.log("off message");
      });
    };
  }
);
</script>

<style scoped lang="scss">
.head-area {
  width: 100%;
  height: 5%;
}
.body-area {
  width: 100%;
  height: 75%;
  overflow-y: auto;
  padding: 2rem;
  background-color: #fff;
  line-height: 1.5;
}

.chat {
  display: flex;
  align-items: flex-start;
  padding: 1rem 0;
  &__content {
    max-width: 70rem;
    background: rgba(99, 230, 191, 0.624);
    padding: 1.2rem 1.2rem;
    border-radius: 7px;
    font-size: 1.3rem;
    p {
      max-width: 70rem;
      word-break: break-all;
    }
    span {
      font-size: 1.1rem;
    }
  }
  &__userinfo {
    width: 5rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    font-size: 1.3rem;
    margin-right: 1.5rem;
    overflow: hidden;
    word-wrap: break-word;
    img {
      border-radius: 50%;
    }
  }
  &.me {
    justify-content: flex-start;
    flex-direction: row-reverse;
    .chat__userinfo {
      align-items: flex-start;
      margin-right: 0;
      margin-left: 1.5rem;
    }
    .chat__content {
      background: rgba(226, 110, 116, 0.397);
    }
  }
}

.foot-area {
  width: 100%;
  height: 20%;
  border-top: 2px solid #ddd;
}
.utils__chats {
  @include display-flex(flex, center, center);
  textarea {
    width: 90%;
    height: 13rem;
    resize: none;
    border: 1px solid silver;
    border-right: none;
  }
  button[type="submit"] {
    @include display-flex(inline-flex, center, center);
    width: 8%;
    height: 13.5rem;
    border: 1px solid silver;
    background-color: #ddd;
  }
}
.utils__txtcontrol {
  @include display-flex(inline-flex, flex-start, center);
  width: 100%;
  height: 2rem;
  font-size: 1.3rem;
  padding-left: 1rem;
}
.profileimg {
  color: #fff;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  img {
    border-radius: 50%;
  }
}
</style>
