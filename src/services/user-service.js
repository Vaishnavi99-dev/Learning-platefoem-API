import { getPrismaClient } from "../db/prisma-client.js";
import * as repo from "../repository/user-repository.js";
import {
  BadRequestError,
  NotFoundError,
  UnderMaintainance,
} from "../utils/App-error.js";
import { hashPassword } from "../utils/utilityFunctions.js";

export const createUser = async (name, email, pass, role = "student") => {
  try {
    // Input validation
    if (![name, email, pass].every((field) => field?.trim())) {
      throw new BadRequestError("All arguments are required.");
    }

    // Check existing user
    const existingUser = await repo.getUserByEmail(email);

    if (existingUser) {
      throw new BadRequestError("User already exists with this email.");
    }

    const hashedPassword = await hashPassword(pass);

    // Create user
    const newUser = await repo.createUser(
      name,
      email,
      hashedPassword,
      role,
    );

    // Return safe response
    return {
      id: newUser.id, 
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  } catch (error) {
    // Re-throw so controller can handle response properly
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await repo.getAllUsers();
    if (!users || users.length === 0) {
      throw new BadRequestError("No users found.");
    }
    return users;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, name, password, role) => {
  try {
    if (!id) {
      throw new BadRequestError("Id is missing");
    }
    
    const isUserExist = await repo.getUserById(id);
    console.log(`Is User Exists: ${JSON.stringify(isUserExist)}`);

    if (!isUserExist) {
      throw new NotFoundError("User with this id does not exist.");
    }

    const fieldsToUpdate = {};

    if(name) {
      fieldsToUpdate.name = name; 
    }

    if(password){
      const hashedPassword = await hashPassword(password);
      fieldsToUpdate.password = hashedPassword;
    }

    if(role) {
      fieldsToUpdate.role = role;
    }
    
    const updatedUser = await repo.updateUser(id, fieldsToUpdate);
    return { id: updatedUser.id };
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    if (!id) {
      throw new BadRequestError("Id is missing");
    }
    const idToCheck = typeof id === "number" ? id : Number(id);
    if (isNaN(idToCheck)) {
      throw new BadRequestError("Please provide a valid Id");
    }
    const isUserExist = await repo.getUserById(idToCheck);
    console.log(`Is User Exists: ${isUserExist}`);
    if (!isUserExist) {
      throw new NotFoundError("User with this id does not exist.");
    }

    const deleteUsers = await repo.deleteUser(id);
    return deleteUsers;
  } catch (error) {
    throw error;
  }
};
