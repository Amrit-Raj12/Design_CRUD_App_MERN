const express = require("express");
const route = express.Router();
const User = require("../model/user");
const Blog = require("../model/postsmodel");

//Register route
route.post("/register", (req, res) => {
  let register = new User(req.body);
  register.save().then((err, docs) => {
    if (err) res.send(err);
    else res.send("Succesfully Registered");
  });
});

//Login router
route.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((found) => {
      console.log("User exists");
      if (found.password == req.body.password) {
        res.send("1");
      } else {
        res.send("0");
      }
    })
    .catch((err) => res.send("User Not found"));
});

//Post retrival route

route.get("/posts", (req, res) => {
  Blog.find((err, data) => {
    if (err) res.json(err);
    else res.json(data);
  });
});

//Post retrival by id route

route.get("/posts/:id", (req, res) => {
  Blog.findById(req.params.id, (err, data) => {
    if (err) res.json(err);
    else res.json(data);
  });
});

//Add post route
route.post("/add-post", (req, res) => {
  let adding = new Blog(req.body);
  adding.save((err, docs) => {
    if (err) res.json("Try again!!");
    else res.json("Congrats! Post has been added");
  });
});

// Update Post
route.put("/update-post/:id", (req, res) => {
  // Validate Request
  if (!req.body.desc) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  // Find note and update it with the request body
  Blog.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      desc: req.body.desc,
      auth:req.body.auth,
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Post not found with id " + req.params.id,
        });
      }
      res.send({ message: "Updated Succesfully" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Post not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.id,
      });
    });
});

// Delete Post
route.delete("/delete-post/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Post not found with id " + req.params.id,
        });
      }
      res.send({ message: "Post deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Post not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete post with id " + req.params.id,
      });
    });
});

module.exports = route;
