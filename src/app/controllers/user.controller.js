import { checkCampus } from "../../utils/helper.js";
import Student from "../models/Student.js";

const addWallet = async (req, res) => {
    try {
        const { student_code, campus_code, wallet } = req.body;
        const ORM = checkCampus(campus_code);
        const infoUser = await ORM.table("fu_user").where(
            "user_code",
            student_code
        );
        
        if (infoUser.length === 0) {
            throw new Error("Not found user");
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
        });

        res.status(200).json({
            status: "success",
            message: "Add wallet success",
        });

    } catch (error) {
        res.status(400).json({ status: "error", error: error.message });
    }
};

export { addWallet };
