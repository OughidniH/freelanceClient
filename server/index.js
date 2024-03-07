import express from "express";
import dotenv from "dotenv";
import roomRouter from "./routes/roomRouter.js";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
// const freelanceRouter = require("./routes/freelanceRouter");
import freelanceRouter from "./routes/freelanceRouter.js";
import bodyParser from "body-parser";

const port = process.env.PORT || 5000;

const app = express();
dotenv.config();

//  test PostMan
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/freelances", freelanceRouter);
app.get("/", (req, res) => res.json({ message: "Welcome to our API" }));

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, res) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
// Router freelance

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`database conncted`);
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};

startServer();
