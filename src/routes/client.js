import express from "express";
import { MintNFT, getAllToken } from "../app/controllers/aura.controller.js";
import { addWallet, checkAddress, exchangeNFT, getAllNFT, getAllNFTinWallet } from "../app/controllers/user.controller.js";
import { uploadImageToWeb3 } from "../app/controllers/web3Storage.js";
const router = express.Router();

router.get("/check-address", checkAddress);
router.post("/add-wallet", addWallet);
router.get("/get-all-nft", getAllNFTinWallet);
router.post("/exchange-nft", exchangeNFT);

// api test
router.get("/all-token", getAllToken);
router.post("/upload-image-web3storage", uploadImageToWeb3);
router.post("/mint-nft", MintNFT);

router.get('/all-nft', getAllNFT);

export default router;
