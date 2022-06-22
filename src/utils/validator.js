import { check } from "express-validator";

const validateLogin = () => {
    return [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").not().isEmpty(),
    ];
};

export {
    validateRegister,
    validateLogin,
    validateProfile,
    validateChallenge,
    validateRunCode
};
