import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { useUserStore } from "@stores/userStore";
import { useWsStore } from "@stores/wsStore";
import { ref } from "vue";

export const getPath = defineStore("getPath", () => {
  const userStore = useUserStore();
  const wsStore = useWsStore();
  const route = useRoute();

  const prev_ws = ref("");
  const now_ws = ref("");

  const getWorkspaceName = () => {
    let workspace = route.params.workspace as string;
    if (!workspace) {
      const parts = route.fullPath.split("/");
      workspace = parts[2]; // EX) ['','workspaces','general']
    }
  };

  return { prev_ws, now_ws, getWorkspaceName };
});
