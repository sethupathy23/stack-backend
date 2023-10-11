import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
// const express = require("express");

const app = express();
app.use(cors());

// const cors = require("cors");
app.use(express.json());
const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

console.log(process.env.MONGO_URL);

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});
//http://localhost:4000/questions
// const questions = [
//   {
//     question: "1. How to use drag and drop in ant design ?",
//     answer:
//       "What I want is an example about how to make the drag and drop of my Table that works properly, but I cannot figure out how to make it works",
//   },
//   {
//     question:
//       "2. How to add spacing between slides in react-slick without using padding ?",
//     answer:
//       "I am using react-slick to create a slider in my React project. I am displaying three slides at a time. I want to add some space between these slides, but I'd like to avoid using padding. How can I achieve this?",
//   },
//   {
//     question:
//       "3. How to get data from one table to dropdown menu in modal for another table ?",
//     answer:
//       "I created one table called and second table called. Each table have name and surname column.So, I want to create third table with modal for add rows to table. Modal has to contain two dropdown menus. In first one I have to get values from table from name and surname column and second, values from table, also name and surname columns. So, when I submit that values I got data in new row in table (my third table).My question is, can I get it done with just html, css and javascript at all? Every table is on different html page, so I do not know how to join it.If somebody can give me a hint, please help.",
//   },
//   {
//     question:
//       "4. How to make Bootstrap 5 navbar collapse when its nav items exceed the screen width ?",
//     answer:
//       "I understand that Bootstrap 5 Navbar has a certain breakpoint where the navbar collapses based on the screen size. But if the user has zoom size of more than 100%, the nav items to the right get disappeared. Upon increasing the zoom size further to certain level, only then the navbar collapses. How can I make navbar collapse when the nav items exceed the screen width, irrespective of screen size?",
//   },
// ];
//protection kaga auth middleware
app.get("/questions", async function (request, response) {
  //db.questions.find({});
  // const questions = await client
  //   .db("B42WD2")
  //   .collection("Questions")
  //   .find({})
  //   .toArray();
  response.send(questions);
});

app.post("/questions", async function (request, response) {
  //db.questions.insertMany(data);
  const data = request.body.questions;
  const result = await client
    .db("B42WD2")
    .collection("Questions")
    .insertMany(data);
  response.send(result);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
