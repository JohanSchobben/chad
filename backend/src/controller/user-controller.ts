import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import RefreshToken from "../models/refreshToken";
import {RegisterForm} from "../forms/register-form";
import { LoginForm } from "../forms/login-form";
import crypto from "crypto";
import { getEnvVar } from "../env";

let code = crypto.randomBytes(10).toString('hex');

export const getRegisterToken = async (req: Request<any, RegisterForm>, res: Response) => {
    res.json({
        secretCode: code
    });
}

export const register = async (req: Request<any, RegisterForm>, res: Response) => {
    const {username, password, secretQuestion, secretAnswer, registerToken} = req.body;
    const encryptedPassword = await bcrypt.hash(password, 12);

    const userExists = await User.findOne({
        where: {
            username
        }
    });

    if (code !== registerToken) {
        res.status(422).json({
            message: "secret code is incorrect"
        });
        return;
    } 

    if (userExists) {
        res.status(422).json({
            message: "user already exists"
        });
        return;
    } else {
        User.create({
            username: username,
            password: encryptedPassword,
            secretQuestion: secretQuestion,
            secretAnswer: secretAnswer,
        });

        code = crypto.randomBytes(10).toString('hex');

        res.status(201).json({
            message: "user created",
        });
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const {username, secretAnswer, resetCode, newPassword} = req.body;
    const user =  await User.findOne({
        where: {
            username
        }
    });

    if (!user) {
        res.status(422).json({
            message: "user does not exist"
        });
        return;
    }

    if(user.secretAnswer === secretAnswer && user.resetCode === resetCode) {
        user.password = newPassword;
        await user.save();
        res.json({
            message: "Password changed"
        });
    } else {
        res.status(422).json({
            message: "secret question or resetcode is incorrect"
        });
    }    
}

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.json({
        users
    });
}

export const login = async (req: Request<null, LoginForm>, res:  Response) => {
    const {username, password} = req.body;
    const user = await User.findOne({
        where: {
            username
        }
    });

    if (!user) {
        res.status(401).json({
            message: "No user with the given username"
        });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (passwordCorrect) {
        const payload = {username: user.username, id: user.id};

        const token = jwt.sign(payload, getEnvVar('ACCESS_TOKEN_SECRET'), {expiresIn: '7h'});
        const refreshToken = jwt.sign(payload, getEnvVar('REFRESH_TOKEN_SECRET'), {expiresIn: "7d"});
        RefreshToken.create({
            token: refreshToken
        });

        res.status(200).json({
            accesToken: token,
            refreshToken: refreshToken,
            user: user.username
        });
    } else {
        res.status(401).json({
            message: "Incorrect password"
        });
    }
}

export const refreshToken = async (req: Request<null, LoginForm>, res:  Response) => {
    const token = req.body.token;
    
}