import express from "express";
import {register, resetPassword } from "../controller/user-controller"

const router = express.Router();


router.get('/', (req, res) => {
    res.json({
        message: "Hello world!!!!!"
    });
});

router.post('/register', register);
router.post('/reset-pw', resetPassword)

export default router;