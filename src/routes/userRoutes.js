import express from 'express';
import { addUsers, editUser, fetchUsers, removeUser } from '../controllers/userController.js';
import { createUserSchema, updateUserSchema } from '../zodSchemas/userValidationSchema.js';
import { reqBodyValidation, reqParamsValidation } from '../middlerware/validationMiddlerwares.js';
import { idValdationSchema } from '../zodSchemas/idValidationSchema.js';

const userRoutes = express.Router();

userRoutes.get("/",fetchUsers);
userRoutes.post("/", reqBodyValidation(createUserSchema), addUsers);
userRoutes.patch("/:id", reqParamsValidation(idValdationSchema), reqBodyValidation(updateUserSchema),editUser);
userRoutes.delete("/:id", reqParamsValidation(idValdationSchema), removeUser);

export default userRoutes;