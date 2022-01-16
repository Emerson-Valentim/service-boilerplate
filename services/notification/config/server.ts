import { createServer } from "http";

import { Server as SocketServer } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

import { CLogger } from "../ports/logger";

export default class Server {
  protected static httpClient = createServer();
  protected static socketIO = new SocketServer(Server.httpClient, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  public static async local() {
    await Server.adapter();

    Server.register();

    Server.httpClient.listen(3000, () =>
      CLogger.info(`🥸 Server running on http://localhost:3000/`)
    );
  }

  private static async adapter() {
    const pubClient = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    const subClient = pubClient.duplicate();

    await pubClient.connect();
    await subClient.connect();

    Server.socketIO.adapter(createAdapter(pubClient, subClient));
  }

  private static register() {
    Server.socketIO.on("connection", (socket) => {
      socket.on("server:example", (message) => {
        CLogger.info("Reached event server:example");

        Server.socketIO.emit("client:example", message);
      });

      socket.on("server:example:job:done", (message) => {
        CLogger.info("Reached event server:example:job:done");

        Server.socketIO.emit("client:example:job:done", message);
      });
    });
  }
}
