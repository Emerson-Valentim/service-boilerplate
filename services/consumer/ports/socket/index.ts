import { Managers } from "evs-tools";

Managers.SocketManager.add([
  { host: `http://${process.env.SOCKET_HOST}:3000/`, instance: "socket-1" },
]);

export default Managers.SocketManager;
