import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, {UserStatus} from "../models/User";
import {RegisterForm} from "../forms/register-form";
import { LoginForm } from "../forms/login-form";


export const register = async (req: Request<any, RegisterForm>, res: Response) => {
    const {username, password, secretQuestion, secretAnswer} = req.body;
    const encryptedPassword = await bcrypt.hash(password, 12);

    const userExists = await User.findOne({
        where: {
            username
        }
    });

    if (userExists) {
        return res.status(422).json({
            message: "user already exists"
        })
    } else {
        User.create({
            username: username,
            password: encryptedPassword,
            secretQuestion: secretQuestion,
            secretAnswer: secretAnswer,
            status: UserStatus.Registrating
        });

        res.status(201).json({
            message: "user created",
        })
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
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    } else {
        res.status(401).json({
            message: "Incorrect password"
        });
    }
}