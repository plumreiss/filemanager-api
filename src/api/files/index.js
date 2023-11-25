const { Router } = require("express");
import axios from "axios";

const router = Router();

const API = "https://echo-serv.tbxnet.com";

axios.defaults.baseURL = API;
axios.defaults.headers.common["Authorization"] = "Bearer aSuperSecretKey";

const formatFile = (data) => {
  const rows = data.split("\n");

  let newData = [];

  rows.forEach((row) => {
    const currentRow = row.split(",");

    const numberValue = parseFloat(currentRow[2]);

    const hexValue = currentRow[3];

    if (
      !currentRow[0] ||
      !currentRow[0] ||
      isNaN(numberValue) ||
      !/^([0-9A-Fa-f]{2}){16}$/.test(hexValue)
    ) {
      return;
    }

    newData.push({
      file: currentRow[0],
      text: currentRow[1],
      number: numberValue,
      hex: hexValue,
    });
  });

  return newData;
};

router.get(`/files`, async (req, res) => {
  try {
    const { data } = await axios.get(`/v1/secret/files`);

    const filesData = await Promise.allSettled(
      data.files.map((file) => axios.get(`/v1/secret/file/${file}`))
    );

    const formattedFiles = filesData.reduce((acc, current) => {
      if (current.status !== "fulfilled") {
        return acc;
      }
      return [...acc, ...formatFile(current.value.data)];
    }, []);

    res.status(200).json({
      files: formattedFiles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
