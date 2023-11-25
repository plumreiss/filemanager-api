import buildServer from "./api";

const server = { app: null };

const { PORT = 8000 } = process.env;

(async () => {
  try {
    server.app = await buildServer();

    await server.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
