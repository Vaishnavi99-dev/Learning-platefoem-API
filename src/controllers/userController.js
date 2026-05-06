import * as userService from "../services/user-service.js";
import { sendSuccess } from "../utils/response.js";
import {BadRequestError,NotFoundError} from "../utils/App-error.js";

export const fetchUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return sendSuccess(res, users, "Users retrieved successfully");
  } catch (error) {
     next(error);
  }
};

export const addUsers = async (req, res, next) => {
  try {
    const { name, email, password, role = "student" } = req.body;
    console.log("Received user data:", email);
    // Call service layer
    const user = await userService.createUser(name, email, password, role);

    return sendSuccess(res, user, "User created successfully", 201);
  } catch (error) {
     next(error);
  }
};

export const editUser = async (req, res, next) => {
  try {
    const { name, password, role } = req.body;
    const { id } = req.params;
    const idToCheck = typeof id === "number" ? id : Number(id);

    const user = await userService.updateUser(idToCheck, name, password, role);

    return sendSuccess(res, user, "User updated successfully");
  } catch (error) {
    next(error);
  }
};

export const removeUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const idToCheck = typeof id === "number" ? id : Number(id);

    const user = await userService.deleteUser(idToCheck);

    return sendSuccess(res, user, "User deleted successfully");
  } catch (error) {
    next(error);
  }
};
