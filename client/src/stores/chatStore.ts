import { defineStore } from "pinia";
import { ref } from "vue";
import type { IChat, IDM } from "@/types/db";
import axios from "axios";

export const useChatStore = defineStore("chat", () => {
  const chats = ref<IChat[]>();
  const page = ref(1);

  const sendChat = async (wsname: string, chnname: string, content: string) => {
    await axios
      .post(`/api/workspaces/${wsname}/channels/${chnname}/chats`, {
        content: content,
      })
      .then((res) => {
        getChat(wsname, chnname);
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  const getChat = async (wsname: string, chnname: string) => {
    await axios
      .get(
        `/api/workspaces/${wsname}/channels/${chnname}/chats?perPage=100&page=${1}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        chats.value = res.data;
      })
      .catch((err) => {
        console.dir(err);
        console.log(err);
      });
  };

  return { chats, sendChat, getChat, page };
});
