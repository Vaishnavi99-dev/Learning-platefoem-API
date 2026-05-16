import * as authService from "../services/auth-service.js"
import { sendSuccess } from "../utils/response.js";
export const login = async(req, res, next)=>{
    try {
        const {email, password} = req.body;

        const data = await authService.loginUser(
            email, password
        );

        return sendSuccess(
            res, data, "Login Successful"
        );

    } catch (error) {
        next(error);
    }
};