import axios from "axios";
import { formatFile } from "../../utils/format-file";
const { Router } = require("express");

const router = Router();

export const API = "https://echo-serv.tbxnet.com";

axios.defaults.baseURL = API;
axios.defaults.headers.common.Authorization = "Bearer aSuperSecretKey";

router.get("/files/data", async (req, res) => {
  try {
    const { fileName } = req.query;

    if (fileName) {
      const data = await axios
        .get(`/v1/secret/file/${fileName}`)
        .catch((response) => response);

      if (!data?.data) {
        return res.status(404).json({ error: "File not found" });
      }
      const formmatedFile = formatFile(data.data);
      if (!formmatedFile.length) {
        return res.status(403).json({
          error: "Request failed because file is improperly formmated",
        });
      }

      return res.json(formmatedFile);
    }

    const { data } = await axios.get("/v1/secret/files");

    const filesData = await Promise.allSettled(
      data.files.map((file) => axios.get(`/v1/secret/file/${file}`))
    );

    const formattedFiles = filesData.reduce((acc, current) => {
      if (current.status !== "fulfilled") {
        return acc;
      }
      return [...acc, ...formatFile(current.value.data)];
    }, []);

    res.status(200).json(formattedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
