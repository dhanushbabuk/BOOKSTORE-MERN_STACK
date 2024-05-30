import express from "express";
import { PORT, mongodbURl } from "../backend/config.js";
import { BookModel } from "./models/bookmodel.js";
import mongoose from "mongoose";
const app = express();

import cors from "cors";

// body parser middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
// middleware to handle the cors policy
// 1.allows all origin which is default cors(*)
app.use(cors());
// 2.allows custom origin
// app.use(
//   cors({
//     origin: "http://localhost:3000/",
//     methods: ["GET", "PUT", "POST", "DELETE"],
//     allowedHeaders: ["content-type"],
//   })
// );
app.set("view engine", "ejs");

// route to get all books from database
app.get("/books", async (req, res) => {
  try {
    //   find is used to get all documents
    const books = await BookModel.find({});

    res.render("index", { books });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get("/add", (req, res) => {
  res.render("addBook");
});

// route to create or add new book
app.post("/add", async (req, res) => {
  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await BookModel.create(newBook);
    // showSuccessAlertForAdding();
    // res.redirect("/books");
  } catch (error) {
    // showErrorAlertForAdding(error.message);
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route to get a one book from database by id
app.get("/book/:id", async (req, res) => {
  try {
    //   fined is used to get all documents
    const { id } = req.params;
    const book = await BookModel.findById(id);

    res.render("bookInfo", { book });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get("/book/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    if (!book) {
      res.status(404).send("Book not found");
      return;
    }
    res.render("updateBook", { book });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// route to update the book
app.post("/book/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;

    const book = await BookModel.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { new: true }
    );
    // showSuccessAlertForUpdating();
    // res.redirect(`/book/${book._id}`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
    // showErrorAlertForUpdating(error.message);
  }
});

app.get("/book/:id/delete", async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);

  res.render("deleteBook", { book });
});

// route to delete a book
app.post("/book/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await BookModel.findByIdAndDelete(id);
    if (!result) {
      res.send("book not found");
      return;
    }
    // showSuccessAlertForDeleting();
    // res.redirect("/books");
  } catch (error) {
    // showErrorAlertFordeleting(error.message);
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongodbURl)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT || 4000, () => {
      console.log(`APP is Listening at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
