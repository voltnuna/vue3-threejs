import { defineStore } from "pinia";
import { ref } from "vue";
import type { IChannel } from "@/types/db";
import axios from "axios";

export const useChnStore = defineStore("channels", () => {
  const channels = ref<IChannel[]>();
  const channel = ref<IChannel>();

  //### S: Channel
  const fetchChannels = async (wsname: string) => {
    await axios
      .get(`/api/workspaces/${wsname}/channels`, {
        withCredentials: true,
      })
      .then((res) => {
        channels.value = res.data;
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  const getChannel = async (workspace: string, channelName: string) => {
    /*특정 workspace 내부의 특정 channel 정보를 가져옴. return: IChannel */
    await axios
      .get(`/api/workspaces/${workspace}/channels/${channelName}`, {
        withCredentials: true,
      })
      .then((res) => {
        channel.value = res.data;
      })
      .catch((err) => {
        console.dir("특정 채널 정보 가져오기 실패", err.response.data);
      });
  };

  const createChannel = async (wsname: string, channel: string) => {
    await axios
      .post(`/api/workspaces/${wsname}/channels`, { name: channel })
      .then((res) => {
        channels.value = res.data;
      })
      .catch((err) => {
        console.dir("###채널생성 실패", err.response.data);
      });
  };

  //### E: Channel

  return {
    channels,
    channel,
    fetchChannels,
    createChannel,
    getChannel,
  };
});
