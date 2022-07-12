import express from "express";
import { addWallet } from "../app/controllers/user.controller.js";
const router = express.Router();

router.post("/add-wallet", addWallet);

export default router;
