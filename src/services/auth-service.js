import bcrypt from "bcrypt";

import * as repo from "../repository/user-repository.js";
import { BadRequestError } from "../utils/App-error.js";
import { generateToken } from "../utils/jwt.js";

export const loginUser = async(email, password) =>{
    const user = await repo.getUserByEmail(email);

    if(!user){
        throw new BadRequestError(
            "Invalid email or password."
        );
    }

    const isPasswordValid = await bcrypt.compare(
        password , user.password
    );

    if(!isPasswordValid){
        throw new BadRequestError(
            "Invalid email or password"
        );
    }

    const token = generateToken({
        id   : user.id,
        role : user.role,
    });

    return {
        token,
        user : {
            id   : user.id,
            name : user.name,
            role : user.role,
        },
    };
};