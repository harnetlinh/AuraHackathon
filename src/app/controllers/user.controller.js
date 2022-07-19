import { getAllToken, MintNFT } from "../../helpers/aura.js";
import { checkCampus } from "../../utils/helper.js";
import AvailablePrize from "../models/AvailablePrize.js";
import Student from "../models/Student.js";
import crypto from "crypto";

const checkAddress = async (req, res) => {
    try {
        const { user_code } = req.body;
        const student = await Student.findOne({ studentCode: user_code });

        if (student) {
            res.status(200).json({
                message: "Sinh viên đã được gắn ví!",
                result: true,
                status: "success",
            });
        } else {
            res.status(200).json({
                message: "Sinh viên chưa được gắn ví!",
                result: false,
                status: "success",
            });
        }
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};

const addWallet = async (req, res) => {
    try {
        const { student_code, campus_code, wallet } = req.body;
        const ORM = checkCampus(campus_code);
        const infoUser = await ORM.table("fu_user").where(
            "user_code",
            student_code
        );

        if (infoUser.length === 0) {
            throw new Error("Không tìm thấy user!");
        }

        const checkAddress = await Student.findOne({ nftAddress: wallet });

        if (checkAddress) {
            throw new Error("Ví đã được gắn vào sinh viên khác!");
        }

        await Student.create({
            name:
                infoUser[0].user_surname +
                " " +
                infoUser[0].user_middlename +
                " " +
                infoUser[0].user_givenname,
            email: infoUser[0].user_email,
            studentCode: infoUser[0].user_code,
            studentLogin: infoUser[0].user_login,
            nftAddress: wallet,
            prizeCollection: [],
        });

        res.status(200).json({
            status: "success",
            message: "Add wallet success",
        });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};

const getAllNFTinWallet = async (req, res) => {
    try {
        const { user_code } = req.query;
        const student = await Student.findOne({ studentCode: user_code });

        if (!student) {
            throw new Error(
                "Sinh viên không tồn tại hoặc chưa được gắn địa chỉ ví!"
            );
        }

        const syncNFT = await getAllToken(student.nftAddress);

        if (syncNFT.length === 0 || student.prizeCollection.length === 0) {
            throw new Error("Không có token nào trong ví!");
        }

        student.prizeCollection.map((prize) => {
            const check = syncNFT.tokens.includes(prize.tokenId);
            if (!check) {
                prize.statusId = 1;
            }
            return prize;
        });

        console.log(syncNFT.tokens);
        console.log(student.prizeCollection);
        const result = student.prizeCollection.filter((item) => {
            return item.statusID === 0;
        });

        await student.save();

        res.status(200).json({
            status: "success",
            message: "Lấy dữ liệu NFT thành công",
            result,
        });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};

const exchangeNFT = async (req, res) => {
    try {
        const { user_code } = req.body;
        const student = await Student.findOne({ studentCode: user_code });

        if (!student) {
            throw new Error(
                "Sinh viên không tồn tại hoặc chưa được gắn địa chỉ ví!"
            );
        }

        const getAvailableNFT = await AvailablePrize.find({
            statusID: 0,
        });

        if (getAvailableNFT.length === 0) {
            throw new Error("Không có token nào trong kho!");
        }

        const random = Math.floor(Math.random() * getAvailableNFT.length);
        const nft = getAvailableNFT[random];

        // random token_id
        const str = crypto.randomBytes(32).toString("hex");
        const secret = "adcdefghijklmnopqrstuvwxyz";
        const sha256Hasher = crypto.createHmac("sha256", secret);
        const token_id = sha256Hasher.update(str).digest("hex");

        console.log(token_id);

        const mintNFT = await MintNFT(
            token_id,
            student.nftAddress,
            nft.imageGatewayURL,
            {}
        );

        if (mintNFT.transactionHash) {
            const { data } = mintNFT;

            const newPrize = {
                tokenId: token_id,
                prizeName: "",
                prizeDescription: "",
                prizeImage: nft.imageGatewayURL,
                prizeCategory: "FPoly",
                CID: nft.CID,
                transactionHash: mintNFT.transactionHash,
                height: mintNFT.height,
                gasWanted: mintNFT.gasWanted,
                gasUsed: mintNFT.gasUsed,
            };

            await AvailablePrize.findByIdAndUpdate(nft._id, {
                statusID: 1,
            });

            await Student.findByIdAndUpdate(student._id, {
                $push: {
                    prizeCollection: newPrize,
                },
            });

            return res.status(200).json({
                status: "success",
                message: "Nhận thưởng thành công!",
            });
        }
        console.log(mintNFT);

        res.status(200).json({
            status: "error",
            message: "Nhận thưởng thất bại!",
        });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};

export { addWallet, checkAddress, getAllNFTinWallet, exchangeNFT };
