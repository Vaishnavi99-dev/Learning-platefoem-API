import { getPrismaClient } from "../db/prisma-client.js";

const getAllUsers = async () => {
  try {
    const prismaInst = await getPrismaClient();
    return await prismaInst.user.findMany();
  } catch (error) {
    console.log("Error in getAllUsers Function: ", error);
    return [];
  }
};

const createUser = async (name, email, pass, role = "student") => {
  try {
    const prismaInst = await getPrismaClient();
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

const updateUser = async (name, email , pass, role = "student") => {
    try {
        const prismaInst = await getPrismaClient();
        const updateUsers = await prismaInst.user.update(
            {
                where : {email},
                data : {
                    name ,
                    password : pass,
                    role
                }
            }
        );
        return updateUsers;
    } catch (error) {
      console.log(error);
    }
}

const deleteUser = async (email) =>{
     try {
        const prismaInst = await getPrismaClient();
        const deleteUsers = await prismaInst.user.delete(
          {
            where : {
              email : email
            },
          });
        return deleteUser;
     } catch (error) {
        console.log(error);
     }
}

const createUserResult = await createUser("jhon1" , "jhone1@gmail.com", "jhh@123");
console.log(createUserResult);

const results = await getAllUsers();
console.log(results);