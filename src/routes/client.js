import express from "express";
import { addWallet } from "../app/controllers/user.controller.js";
import { uploadImageToWeb3 } from "../app/controllers/web3Storage.js";
const router = express.Router();

router.post("/add-wallet", addWallet);
router.post("/upload-image-web3storage", uploadImageToWeb3);

export default router;
