import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from"./config/database.js";
import auth from "./routes/auth.js"
import todo from "./routes/todo.js";
import authentication from "./middleware/auth.js";
import 'express-async-errors'
import errorHandlerMiddleware from "./middleware/error-handler.js";
const app = express();
dotenv.config()
/* middleware */

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disabled("x-powered-by");

const { PORT } = process.env;
const port = PORT;

app.get("/api/v1", (req, res) => {
  res.json("Welcome!");
});

app.use("/api/v1/auth",auth)
app.use("/api/v1/todo",authentication,todo)

app.use(errorHandlerMiddleware)
/*start server */
connect();
app.listen(port, () => {
  console.log(`server connected to port :${port}`);
});
