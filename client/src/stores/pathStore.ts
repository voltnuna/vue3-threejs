import { defineStore } from "pinia";
import { ref } from "vue";

export const usePathStore = defineStore("pagePath", () => {
  const currentPath = ref("");

  const getCurrentPath = (path: string) => {
    currentPath.value = path;
  };

  return { currentPath, getCurrentPath };
});
