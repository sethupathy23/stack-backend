import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = express();
const PORT = 4000;
const MONGO_URL = "mongodb://127.0.0.1";

app.use(express.json());
app.use(cors());

const client = new MongoClient(MONGO_URL);

async function startServer() {
  try {
    await client.connect();
    console.log("Mongo is connected !!!");

    const db = client.db("B42WD2");
    const questionsCollection = db.collection("Questions");

    app.get("/", (request, response) => {
      response.send("🙋‍♂️, 🌏 🎊✨🤩");
    });

    app.get("/questions", async (request, response) => {
      const questions = await questionsCollection.find({}).toArray();
      response.send(questions);
    });

    app.post("/questions", async (request, response) => {
      const data = request.body.questions;
      const result = await questionsCollection.insertMany(data);
      response.send(result);
    });

    app.listen(PORT, () => {
      console.log(`The server started in: ${PORT} ✨✨`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
