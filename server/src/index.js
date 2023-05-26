import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import colors from "colors"
import { userRouter } from "../routes/users.js";
import { recipesRouter } from "../routes/recipes.js";

const app = express()

app.use(express.json())
app.use(cors({ origin: "*" }));

//routes 
app.use("/auth", userRouter)
app.use("/recipes", recipesRouter);

const port = 3000
const uri = "mongodb+srv://admin:rHvkaW9ttKs5Od4Q@cluster0.vtzjdi0.mongodb.net/recipes";

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`mdb database connection established successfully`.bgMagenta.white)
})

app.listen(port, () => console.log(`Server is running in port ${port}`.bgBlue.white))