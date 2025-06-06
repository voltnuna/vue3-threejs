import { defineStore } from "pinia";
import { ref } from "vue";
import type { IUser } from "@/types/db";
import axios from "axios";

export const useMemberStore = defineStore("member", () => {
  const wsMembers = ref<IUser[]>();
  const wsMember = ref<IUser[]>();

  const getMember = async (wsname: string, memberId: string) => {
    await axios
      .get(`/api/workspaces/${wsname}/users/${memberId}`, {
        withCredentials: true,
      })
      .then((res) => {
        wsMember.value = res.data;
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  const getAllMembers = async (wsname: string) => {
    await axios
      .get(`/api/workspaces/${wsname}/members`, {
        withCredentials: true,
      })
      .then((res) => {
        wsMembers.value = res.data;
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  const inviteWsMember = async (wsname: string) => {
    await axios
      .post(`/api/workspaces/${wsname}/members`, { email: "" })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  const removeMember = async (wsname: string, memberId: string) => {
    await axios
      .delete(`/workspaces/${wsname}/members/${memberId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  return {
    wsMembers,
    wsMember,
    inviteWsMember,
    removeMember,
    getMember,
    getAllMembers,
  };
});
