import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { ref } from "vue";

export const usePathStore = defineStore("getPath", () => {
  const route = useRoute();

  const current_ws = ref("");
  const prev_ws = ref("");

  const prev_chn = ref("");
  const current_chn = ref("");

  const setWorkspaceName = () => {};

  const getWorkspaceName = () => {
    let workspace = "";
    let channel = "";

    const fullpath = route.fullPath.split("/");
    workspace = fullpath[2];
    channel = fullpath[4];

    if (prev_ws.value === current_ws.value) {
      current_ws.value = workspace;
      current_chn.value = channel;
    } else {
      prev_ws.value = current_ws.value;
      prev_chn.value = current_chn.value;
      current_ws.value = workspace;
      current_chn.value = channel;
    }
  };

  return { prev_ws, current_ws, prev_chn, current_chn, getWorkspaceName };
});
