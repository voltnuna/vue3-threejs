import { defineStore } from "pinia";
import { ref } from "vue";

export const usePathStore = defineStore("pagePath", () => {
  const currentPath = ref("");

  const setCurrentPath = (path: string) => {
    currentPath.value = path;
  };

  return { currentPath, setCurrentPath };
});
