import { createServer } from "http";

import { Server } from "socket.io";

import { CLogger } from "./ports/logger";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  socket.on("server:example", (message) => {
    CLogger.info("Reached event server:example");

    io.emit("client:example", message);
  });

  socket.on("server:example:job:done", (message) => {
    CLogger.info("Reached event server:example:job:done");

    io.emit("client:example:job:done", message);
  });
});

httpServer.listen(3000, () =>
  CLogger.info(`🥸 Server running on http://localhost:3000/`)
);
