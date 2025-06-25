import { ref } from "vue";
import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";

import { useChnStore } from "@stores/channelStore";
import type { IChannel } from "./../types/db";

const backUrl = "http://localhost:3095";
const socketConnection = io(`${backUrl}`);

export const useSkStore = defineStore("socket-connection", () => {
  const useChnnel = useChnStore();
  const sockets: { [key: string]: Socket } = {};
  const onlieList = ref<number[]>();

  const disconnect = (ws: string) => {
    if (ws && sockets[ws]) {
      console.log(ws, "소켓 연결 끊음");
      sockets[ws].disconnect();
      delete sockets[ws];
    }
  };

  const createNameSpace = (ws: string) => {
    if (!sockets[ws]) {
      sockets[ws] = io(`${backUrl}/ws-${ws}`, {
        transports: ["websocket"],
      });
    }
    console.info("Create-Socket🚀", ws, sockets[ws]);

    sockets[ws].on("connect_error", (err) => {
      console.error(err);
      console.log(`connect_error due to ${err.message}`);
    });
    return sockets[ws];
  };
  //- 클라이언트 data: { id: number(유저 아이디), channels: number[](채널 아이디 리스트) }
  const emitLogin = (userId: string, channels: number[], ws: string) => {
    sockets[ws].emit("login", { id: userId, channels: channels });
    console.log("EMIT-LOING", userId, channels);
  };

  const getOnlineList = (ws: string) => {
    sockets[ws].on("onlineList", (data: number[]) => {
      onlieList.value = data;
      console.log("🚀🚀🚀🚀onlineList", onlieList.value);
    });
    console.log("socket on dm", sockets[ws]?.hasListeners("dm"), sockets[ws]);
    return () => {
      console.log("socket off dm", sockets[ws]?.hasListeners("dm"));
      sockets[ws]?.off("onlineList");
    };
  };

  return {
    sockets,
    disconnect,
    createNameSpace,
    emitLogin,
    getOnlineList,
    onlieList,
  };
});
