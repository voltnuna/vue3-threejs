import { defineStore } from "pinia";
import { ref } from "vue";
import type { IWorkspace, IChannel } from "@/types/db";
import axios from "axios";

export const useWsStore = defineStore("workspaces", () => {
  const workspaces = ref<IWorkspace[]>([]);
  const channels = ref<IChannel[]>();

  //### S: Workspace
  const fetchWorkspaces = async () => {
    await axios
      .get("/api/workspaces", { withCredentials: true })
      .then((res) => {
        workspaces.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createWorkspace = async (workspace: string, url: string) => {
    await axios
      .post("/api/workspaces", {
        workspace,
        url,
      })
      .then((res) => {
        console.log("create workspace", res.data);
      })
      .catch((err) => {
        err;
      });
  };

  //### E: Workspace

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
        console.log(err);
      });
  };

  const createChannel = async (wsname: string, channel: string) => {
    await axios
      .post(`/api/workspaces/${wsname}/channels`, { name: channel })
      .then((res) => {
        channels.value = res.data;
      })
      .catch((err) => {
        console.log("###채널생성 실패", err);
      });
  };

  //### E: Channel

  return {
    workspaces,
    channels,
    fetchWorkspaces,
    fetchChannels,
    createWorkspace,
    createChannel,
  };
});
