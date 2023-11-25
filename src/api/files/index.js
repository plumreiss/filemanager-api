const { Router } = require("express");
import axios from "axios";

const router = Router();

const API = "https://echo-serv.tbxnet.com";

axios.defaults.baseURL = API;
axios.defaults.headers.common["Authorization"] = "Bearer aSuperSecretKey";

router.get(`/files`, async (req, res) => {
  try {
    const { data } = await axios.get(`/v1/secret/files`);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
