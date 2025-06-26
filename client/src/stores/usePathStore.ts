import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { ref } from "vue";

export const usePathStore = defineStore("getPath", () => {
  const route = useRoute();

  const prev_ws = ref("");
  const current_ws = ref("");

  const prev_chn = ref("");
  const current_chn = ref("");

  const setWorkspaceName = () => {};

  const getWorkspaceName = () => {
    let workspace = "";
    let channel = "";

    const fullpath = route.fullPath.split("/");
    workspace = fullpath[2];
    channel = fullpath[4];

    current_ws.value = workspace;
    current_chn.value = channel;
    console.log(
      "HOOK 실행",
      route.fullPath,
      current_ws.value,
      current_chn.value
    );
  };

  return { prev_ws, current_ws, prev_chn, current_chn, getWorkspaceName };
});
