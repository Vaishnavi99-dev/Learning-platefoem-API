import express from 'express';
import { addUsers, editUser, fetchUsers, removeUser } from '../controllers/userController.js';
import { createUserSchema, updateUserSchema } from '../zodSchemas/userValidationSchema.js';
import { reqBodyValidation, reqParamsValidation } from '../middlerware/validationMiddlerwares.js';
import { idValdationSchema } from '../zodSchemas/idValidationSchema.js';
import { authenticate } from '../auth/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.get("/",authenticate,fetchUsers);
userRoutes.post("/", reqBodyValidation(createUserSchema), addUsers);
userRoutes.patch("/:id",authenticate, reqParamsValidation(idValdationSchema), reqBodyValidation(updateUserSchema),editUser);
userRoutes.delete("/:id",authenticate,reqParamsValidation(idValdationSchema), removeUser);

export default userRoutes;