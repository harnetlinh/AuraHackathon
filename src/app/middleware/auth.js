import * as listCampus from "../../config/campus.js";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const campus = req.headers.campus;

        if (!token) {
            throw new Error("Token không chính xác!");
        }

        const checkCampus = listCampus.indexOf(campus);

        if(checkCampus === -1){
            throw new Error("Cơ sở không tồn tại hoặc không có!");
        }

        req.campus = campus;
        next();
    } catch (error) {
        res.status(401).send({
            status: "error",
            message: error.message,
        });
    }
};

export { auth };
