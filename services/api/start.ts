import Server from "./config/server";

export const handle =
  process.env.ENV !== "prd"
    ? Server.local()
    : Server.lambda();