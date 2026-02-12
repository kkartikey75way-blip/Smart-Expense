import jwt, { SignOptions } from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"]
    });
};

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"]
    });
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as any;
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;
};  
