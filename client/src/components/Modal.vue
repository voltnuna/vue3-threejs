<template>
  <div class="modal form">
    <!-- ### S: Add Workspace-->
    <div v-if="modalType === 'workspace'">
      <form @submit.prevent="handleSubmit">
        <div class="modal-head">
          <span>워크스페이스 생성</span>
          <button type="button" @click="$emit('modalClose')" class="close">
            X
          </button>
        </div>
        <div class="modal-body">
          <div class="inputwrap">
            <input
              type="text"
              placeholder="Workspace Name"
              class="input input-lg"
              v-model="name"
            />
          </div>
        </div>
        <div class="modal-foot">
          <button type="submit">생성하기</button>
        </div>
      </form>
    </div>
    <!-- ### S: Add Channel -->
    <div v-else-if="modalType === 'channel'">
      <form @submit.prevent="handleSubmit">
        <div class="modal-head">
          <span>채널 생성</span>
          <button type="button" @click="$emit('modalClose')" class="close">
            X
          </button>
        </div>
        <div class="modal-body">
          <div class="inputwrap">
            <input
              type="text"
              placeholder="Channel Name"
              class="input input-lg"
              v-model="name"
            />
          </div>
        </div>
        <div class="modal-foot">
          <button type="submit">생성하기</button>
        </div>
      </form>
    </div>
    <!-- ### S: Add Member-->
    <div v-else-if="modalType === 'member'">
      <form @submit.prevent="handleSubmit">
        <div class="modal-head">
          <span>워크스페이스 멤버 초대</span>
          <button type="button" @click="$emit('modalClose')" class="close">
            X
          </button>
        </div>
        <div class="modal-body">
          <div class="inputwrap">
            <input
              type="text"
              placeholder="Member's Email"
              class="input input-lg"
              v-model="email"
            />
          </div>
        </div>
        <div class="modal-foot">
          <button type="submit">초대하기</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modalType: string;
}>();

import { ref } from "vue";
const name = ref("");
const url = ref("");
const email = ref("");

const emit = defineEmits([
  "modalClose",
  "addWorkspace",
  "addChannel",
  "addMember",
]);
const handleSubmit = () => {
  emit("addWorkspace", name.value);
  emit("addChannel", name.value);
  emit("addMember", email.value);
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 40rem;
  border: 1px solid #615f5f;
  border-radius: 0.7rem;
  overflow: hidden;
  top: 25%;
  z-index: 100;
  background-color: #fff;

  left: calc(50% - 20rem);
  box-shadow: 2px 3px 8px #a3a1a1;
  &-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    width: 100%;
    height: 4rem;
    background-color: #212121;
    color: #fff;
    font-size: 1.8rem;
  }
  &-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 1.5rem;
  }
  &-foot {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    width: 100%;
  }
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  width: 100%;
  button[type="submit"] {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #212121;
    color: #fff;
    font-size: 1.8rem;
    border-radius: 7px;
  }
}
.inputwrap {
  width: 100%;
  margin: 1rem 0;

  .input {
    width: 100%;
    padding: 0.8rem;
    border-radius: 7px;

    &-lg {
      width: 100%;
      padding: 1.1rem;
      font-size: 1.8rem;
      border: 1px solid #615f5f;
    }
  }
}
</style>
