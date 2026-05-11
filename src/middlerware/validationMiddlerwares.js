import { BadRequestError } from "../utils/App-error.js";

export const reqBodyValidation = (schema) =>{
    return (req, _, next) => {
        try {
            //parse is a function that compare the req.body from the schema rules.
            req.body = schema.parse(req.body);
            next();
            
        } catch (error) {
            console.log("Body Validation Error: ", error.issues);
            const message = error.issues?.[0].message || "Validation Failed";
            next(new BadRequestError(message));
        }
    }
}

export const reqParamsValidation = (schema) => {
    return (req, _, next) => {
        try {
            //parse is a function that compare the req.params from the schema rules.
            req.params = schema.parse(req.params);
            next();
            
        } catch (error) {
            console.log("Params Validation Error: ", error.issues);
            const message = error.issues?.[0].message || "Validation Failed";
            next(new BadRequestError(message));
        }
    }
}

export const reqQueryValidation = (schema) => {
    return (req, _, next) => {
        try {
            //parse is a function that compare the req.query from the schema rules.
            schema.parse(req.query);
            next();
            
        } catch (error) {
            console.log("Query Validation Error: ", error.issues);
            const message = error.issues?.[0].message || "Validation Failed";
            next(new BadRequestError(message));
        }
    }
}