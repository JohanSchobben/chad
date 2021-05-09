import {Request, Response,  NextFunction, response} from "express";
import {User} from "../models/User"
import jwt from "jsonwebtoken";
import { getEnvVar } from "../env";


export const generateAccesToken = (user: User): string => {
    const payload = {
        username: user.username,
        id: user.id
    };
    return jwt.sign(payload, getEnvVar('ACCESS_TOKEN_SECRET'), {expiresIn: "7h"});
}

export const generateRefreshToken = (user: User): string => {
    const payload = {
        username: user.username,
        id: user.id
    };
    return jwt.sign(payload, getEnvVar('REFRESH_TOKEN_SECRET'), {expiresIn: "7d"});
}

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    const token = bearer?.split(' ')[1];

    if (!token) {
        res.status(401).json({
            message: "token invalid"
        });
        return;
    }

    jwt.verify(token, getEnvVar('ACCESS_TOKEN_SECRET'), (err, decoded) => {
        if (err) {
            response.status(401).json({
                message: "token not valid"
            });
            return;
        } else {
            next();
        }
    });
}

export const getUserIdFromToken = (token: string)=> {

    return new Promise((resolve, reject) => {
        jwt.verify(token, getEnvVar('ACCESS_TOKEN_SECRET'), (err, decoded) => {
            if (err) {
                reject();
            }
            resolve((decoded as any).id);
        });
    })

}