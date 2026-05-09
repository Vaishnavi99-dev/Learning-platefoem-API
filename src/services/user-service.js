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
    console.log("Received22222 user data:", email);

    if (name.trim().length < 4) {
      throw new BadRequestError("Name must be at least 4 characters long.");
    }

     // Password validation
    if (pass.length < 8) {
      throw new BadRequestError("Password must be at least 8 characters long.");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new BadRequestError("Please provide a valid email address.");
    }

    // Role validation
    const allowedRoles = ["student", "teacher", "admin"];
    if (!allowedRoles.includes(role.trim().toLowerCase())) {
      throw new BadRequestError("Role must be student, teacher, or admin.");
    }

    // Normalize input
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();
    const normalizedRole = role?.trim().toLowerCase();

    // Check existing user
    const existingUser = await repo.getUserByEmail(normalizedEmail);

    if (existingUser) {
      throw new BadRequestError("User already exists with this email.");
    }

    const hashedPassword = await hashPassword(pass);

    // Create user
    const newUser = await repo.createUser(
      normalizedName,
      normalizedEmail,
      hashedPassword,
      normalizedRole,
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

    if (name === undefined && password === undefined && role === undefined) {
      throw new BadRequestError("At least one field is mandatory.");
    }
    
    const idToCheck = typeof id === "number" ? id : Number(id);

    if (isNaN(idToCheck)) {
      throw new BadRequestError("Please provide a valid Id");
    }

    if (name !== undefined) {
      if (name === null || name.trim() === "") {
        throw new BadRequestError("Name is required.");
      }

      if (name.trim().length < 4) {
        throw new BadRequestError("Name must be at least 4 characters long.");
      }
    }

    if (password !== undefined) {
      if (password === null || password.trim() === "") {
        throw new BadRequestError("Password is required.");
      }

      if (password.length < 8) {
        throw new BadRequestError("Password must be at least 8 characters long.");
      }
    }

    if (role !== undefined) {
      if (role === null || role.trim() === "") {
        throw new BadRequestError("Role is required.");
      }

      const allowedRoles = ["student", "teacher", "admin"];

      if (!allowedRoles.includes(role.trim().toLowerCase())) {
        throw new BadRequestError("Role must be student, teacher, or admin.");
      }
    }
    
    const isUserExist = await repo.getUserById(idToCheck);
    console.log(`Is User Exists: ${isUserExist}`);

    if (!isUserExist) {
      throw new NotFoundError("User with this id does not exist.");
    }

    const hashedPassword = await hashPassword(password);

    const updateUsers = await repo.updateUser(id, name, role, hashedPassword);
    const safeUser = {
      id: updateUsers.id,
      name: updateUsers.name,
      email: updateUsers.email,
      role: updateUsers.role,
    };
    return safeUser;
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
