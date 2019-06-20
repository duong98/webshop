import dbLoader from "loaders/db";
import expressLoader from "loaders/express";

export default async function serverLoader(server) {
  await dbLoader();
  console.log("✌️   DB loaded and connected!");

  await expressLoader(server);
  console.log("✌️   Express loaded");
}
