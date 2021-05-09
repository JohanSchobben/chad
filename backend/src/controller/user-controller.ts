import {Request, response, Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import RefreshToken from "../models/refreshToken";
import {RegisterForm} from "../forms/register-form";
import { LoginForm } from "../forms/login-form";
import crypto from "crypto";
import { getEnvVar } from "../env";
import { generateAccesToken } from "../utils/authorization";
import { generateRefreshToken } from "../utils/authorization";

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
        const token = generateAccesToken(user);
        const refreshToken = generateRefreshToken(user);
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
    const tokenFromDb = await RefreshToken.findOne({
        where: {
            token: token
        }
    });

    if (!tokenFromDb) {
        res.status(401).json({
            message: "token is invalid"
        });
    }

    jwt.verify(token, getEnvVar('REFRESH_TOKEN_SECRET'), async (err, decoded) => {
        if(err) {
            console.log(err)
            res.status(401).json({
                message: "token expired!"
            });
        } else {
            console.dir(decoded)
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            });

            await RefreshToken.destroy({
                where: {
                    id: tokenFromDb.id
                }
            });

            const accesToken = generateAccesToken(user);
            const refreshToken = generateRefreshToken(user);

            res.json({
                accesToken,
                refreshToken
            });
        }
    });
}

export const generateResetCode = async (req: Request, res:  Response) => {
    const id = req.params.id;
    const code = crypto.randomBytes(10).toString('hex');
    const user = await User.findByPk(id);
    user.resetCode = code;
    user.save();

    res.status(200).json({
        message: "reset code created",
        resetCode: code
    });
}