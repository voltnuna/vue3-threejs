import { ref } from "vue";
import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";

const backUrl = "http://localhost:3095";

export const useSkStore = defineStore("socket-connection", () => {
  const sockets: { [key: string]: Socket } = {};
  const onlieList = ref<number[]>();
  const onlieNickname = ref();

  const disconnect = (ws: string) => {
    if (ws && sockets[ws]) {
      console.log(ws, "소켓 연결 끊음");
      sockets[ws].disconnect();
      delete sockets[ws];
    }
  };

  const createNameSpace = (ws: string): Promise<Socket> => {
    return new Promise((resolve, reject) => {
      if (!sockets[ws]) {
        sockets[ws] = io(`${backUrl}/ws-${ws}`, {
          path: "/socket.io",
          transports: ["websocket"],
        });
      }
      const socket = sockets[ws];

      socket.once("connect", () => {
        console.log(`✅ 연결됨: ${socket.id}`);
        resolve(socket);
      });

      socket.once("connect_error", (err) => {
        console.error("❌ 소켓 연결 에러:", err.message);
        reject(err);
      });
      return sockets[ws];
    });
  }; //

  const emitLogin = (userId: string, channels: number[], ws: string) => {
    sockets[ws].emit("login", { id: userId, channels: channels });
    console.log("EMIT-LOING", userId, channels);
  };

  const getMessage = (ws: string) => {
    sockets[ws].on("message", () => {});
  };

  const getOnlineList = (ws: string) => {
    sockets[ws].on("onlineList", (data: number[]) => {
      onlieList.value = data;
      console.log("🌺onlineList", onlieList.value);
    });
    return () => {
      sockets[ws]?.off("onlineList");
    };
  };

  return {
    disconnect,
    createNameSpace,
    onlieList,
    onlieNickname,
    emitLogin,
    getOnlineList,
    sockets,
  };
});
