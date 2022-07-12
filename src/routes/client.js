import express from "express";
import { MintNFT } from "../app/controllers/aura.controller.js";
import { addWallet } from "../app/controllers/user.controller.js";

const router = express.Router();

router.post("/add-wallet", addWallet);
router.post("/mint-nft", MintNFT);

export default router;
