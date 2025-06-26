import { defineStore } from "pinia";
import { ref } from "vue";
import type { IWorkspace } from "@/types/db";
import axios from "axios";

export const useWsStore = defineStore("workspaces", () => {
  const workspaces = ref<IWorkspace[]>([]);

  // all ws
  const fetchWorkspaces = async () => {
    await axios
      .get("/api/workspaces", { withCredentials: true })
      .then((res) => {
        workspaces.value = res.data;
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  const getMyWorkspace = async (id: number) => {
    await axios
      .get(`/api/workspaces/${id}`, { withCredentials: true })
      .then((res) => {
        workspaces.value = res.data;
      })
      .catch((err) => {
        console.dir(err);
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
        console.dir(err);
      });
  };

  return {
    workspaces,
    fetchWorkspaces,
    createWorkspace,
    getMyWorkspace,
  };
});
