import express from "express";
import { authorize } from "../utils/authorization";
import {register, resetPassword, getRegisterToken, login, generateResetCode, refreshToken } from "../controller/user-controller"

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/auth/reset-pw', resetPassword);
router.get('/register-token', getRegisterToken);
router.get('/reset-code/:id', authorize, generateResetCode);
router.get('/auth/refresh', refreshToken);

export default router;