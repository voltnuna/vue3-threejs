import { io, Socket } from "socket.io-client";

const backUrl = "http://localhost:3095";

const sockets: { [key: string]: Socket } = {};

const useSocket = (workspace?: string): [Socket | undefined, () => void] => {
  const disconnect = () => {
    if (workspace && sockets[workspace]) {
      console.log("소켓 연결 끊음");
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  };

  if (!workspace) {
    return [undefined, disconnect];
  }

  if (!sockets[workspace]) {
    sockets[workspace] = io(`${backUrl}/ws-${workspace}`, {
      transports: ["websocket"],
    });
    console.info("create socket", workspace, sockets[workspace]);
    sockets[workspace].on("connect_error", (err) => {
      console.error(err);
      console.log(`connect_error due to ${err.message}`);
    });
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;
