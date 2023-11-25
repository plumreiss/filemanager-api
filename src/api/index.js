import express from "express";

const buildServer = async () => {
  const server = express();

  server.get("/", (req, res) => {
    res.json({
      hi: "ok",
    });
  });

  return server;
};

export default buildServer;
