import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
// import openai from "./openAI.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get('/', async(req,res) => {
  res.send('hello from Dall-E!');
})

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(4000, () => {
      console.log("server started at port : 4000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// 1:14:38