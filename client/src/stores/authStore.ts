// 1. defineStore 스토어를 정의
import type { IUser } from "@/types/db"; // 타입은 type import로 불러오는게 더 명확

import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const id = ref();
  const email = ref();
  const isLogined = ref(false);
});
