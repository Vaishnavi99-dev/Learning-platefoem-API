import express from 'express';
import { addUsers, editUser, fetchUsers, removeUser } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.get("/",fetchUsers);
userRoutes.post("/", addUsers);
userRoutes.patch("/:id", editUser);
userRoutes.delete("/:id", removeUser);

export default userRoutes;