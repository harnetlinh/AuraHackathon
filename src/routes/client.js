import express from "express";
import { MintNFT, getAllToken } from "../app/controllers/aura.controller.js";
import { addWallet } from "../app/controllers/user.controller.js";
import { uploadImageToWeb3 } from "../app/controllers/web3Storage.js";
const router = express.Router();

router.post("/mint-nft", MintNFT);
router.post("/add-wallet", addWallet);
router.get("/all-token", getAllToken);
router.post("/upload-image-web3storage", uploadImageToWeb3);

export default router;
