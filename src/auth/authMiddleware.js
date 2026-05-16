import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/App-error.js";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = (req, _, next)=>{
    try {
        console.log("req header :" , req.headers);
        if(!req.headers || !req.headers.authorization ||
            !req.headers.authorization.startsWith("Bearer")
        ){  
            throw new UnauthorizedError();
        }

        const authHeader = req.headers.authorization;

        const token = authHeader.split(" ")[1];

        if(!token){
            throw new UnauthorizedError();
        }

        const decoded = jwt.verify(
            token , process.env.JWT_SECRET
        );

        console.log("DECODED",decoded);

        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};