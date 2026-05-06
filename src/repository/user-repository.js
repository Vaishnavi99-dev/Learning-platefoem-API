import { getPrismaClient } from "../db/prisma-client.js";
import { AppError } from "../utils/App-error.js";

export const getAllUsers = async () => {
  try {
    const prismaInst = await getPrismaClient();
    return await prismaInst.user.findMany();
  } catch (error) {
    console.log("Error in getAllUsers Function: ", error);
    return [];
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
        password : pass,
        role,
      },
      select: {
        id: true,
        name: true
      }
    });

    return newUser;

  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id, name, role, pass) => {
  const prisma = await getPrismaClient();
  return await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      role,
      password : pass
    },
  });
};

export const deleteUser = async (id) =>{
     try {
        const prismaInst = await getPrismaClient();
        const deleteUsers = await prismaInst.user.delete(
          {
            where : {
              id : Number(id)
            },
          });
        return deleteUser;
     } catch (error) {
        throw new AppError(error.message , 1122);
     }
}

export const getUserByEmail = async(email)=>{
  try {
    const prismaInst = await getPrismaClient();
    const user = await prismaInst.user.findUnique({
      where : {email : email},
    });
    return user;
  } catch (error) {
    console.log(error);   
  }
}

export const getUserById = async (id) => {
  try {
    const prisma = await getPrismaClient();
    const user = await prisma.user.findUnique({
      where: { id: id }
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}
