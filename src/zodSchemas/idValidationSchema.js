import {z} from "zod";

export const idValdationSchema = z.object({
    id : z
        .string({
            error : (issue) =>{
                if(issue.input === undefined){
                    return "Id is required";
                }

                return "Id must be a string";
            },
        })
        .refine(
            (value) => !isNaN(Number(value)),
            {
                message : "Please provide a valid id",
            }
        )
        .transform((value) => Number(value)),
});