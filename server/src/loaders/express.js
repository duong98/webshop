import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import apiRoutes from "api";

export default function expressLoader(server) {
  server.use(cors());
  server.use(morgan("tiny"));
  server.use(bodyParser.json());

  server.use("/api", apiRoutes);
  server.use(notFound);
}

function notFound(req, res) {
  res.status(500).send({ success: false, msg: "route not found" });
}
