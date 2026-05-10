import { getPrismaClient } from "../db/prisma-client.js";
import { AppError } from "../utils/App-error.js";

export const getAllUsers = async () => {
  try {
    const prismaInst = await getPrismaClient();
    return await prismaInst.user.findMany();
  } catch (error) {
    console.log("Error in getAllUsers Function: ", error);
    throw new AppError(error.message, 1122);
  }
};

export const createUser = async (name, email, pass, role = "student") => {
  try {
    const prismaInst = await getPrismaClient();
    console.log("this is email", email);

    const newUser = await prismaInst.user.create({
      data: {
        name,
        email,
        password: pass,
        role,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error);
    throw new AppError(error.message, 1122);
  }
};

export const updateUser = async (id, dataToUpdate) => {
  try {
    const prisma = await getPrismaClient();
    return await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: dataToUpdate,
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw new AppError(error.message, 1122);
  }
};

export const deleteUser = async (id) => {
  try {
    const prismaInst = await getPrismaClient();
    const deleteUsers = await prismaInst.user.delete({
      where: {
        id: Number(id),
      },
    });
    return deleteUser;
  } catch (error) {
    console.log(error);
    throw new AppError(error.message, 1122);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const prismaInst = await getPrismaClient();
    const user = await prismaInst.user.findUnique({
      where: { email: email },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new AppError(error.message, 1122);
  }
};

export const getUserById = async (id) => {
  try {
    const prisma = await getPrismaClient();
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new AppError(error.message, 1122);
  }
};
