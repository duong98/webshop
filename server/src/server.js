import express from "express";
import { port } from "configs";

import serverloaders from "loaders";

async function startServer() {
  const server = express();

  await serverloaders(server);

  server.listen(port, error => {
    if (error) {
      console.log(error);
      return;
    }
    console.log("################################################");
    console.log(" 🛡️  Server listening on port: ", port, " 🛡️ ");
    console.log("################################################");
  });
}

startServer();
