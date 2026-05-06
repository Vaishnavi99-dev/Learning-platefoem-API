import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "../middlerware/errorHandler.js"; 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(errorHandler);

app.use("/users", userRoutes);

app.use((_, res) => {
    res.status(404).json({
        status: "FAILURE",
        message: "Route not found.",
        data : null
    });
})

// errorHandler.
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});