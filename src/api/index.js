import express from "express";
import v1 from "./files";

const buildServer = async () => {
  const server = express();

  server.use("/api/v1", v1);

  server.get("/", (req, res) => {
    res.json({
      hi: "ok",
    });
  });

  return server;
};

export default buildServer;
