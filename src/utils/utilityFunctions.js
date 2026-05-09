import bcrypt from "bcrypt";

export function isNotEmpty(field) {
    if(field === ""){
        return false;
    }
}

export async function hashPassword (pass){
    // Placeholder for hashing logic
    return await bcrypt.hash(pass, 10);

}

// const hashes =  await hashPassword("yash");
// console.log(hashes);