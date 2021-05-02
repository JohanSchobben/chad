import express from "express";
import {register, resetPassword, getRegisterToken, login } from "../controller/user-controller"

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/reset-pw', resetPassword);
router.get('/register-token', getRegisterToken);

export default router;