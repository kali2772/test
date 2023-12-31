const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { JWT_SECRET, SANDGRID_API_KEY, WEB_URL } = require("../config/keys");
const requirelogin = require("../middleware/requireLogin");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
/*  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  */

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: SANDGRID_API_KEY,
    },
  })
);

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "please add all the fields" });
  } else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (savedUser) {
          return res
            .status(422)
            .json({ error: "user already exist with this email" });
        }
        bcrypt.hash(password, 12).then((hashpassword) => {
          const user = new User({
            email,
            password: hashpassword,
            name,
            pic,
          });
          user
            .save()
            .then((user) => {
              transporter.sendMail({
                to: user.email,
                from: "huk971516@gmail.com",
                subject: "signup success",
                html: "<h1>welcome to instaclone</h1>",
              });
              res.json({
                message: "saved successfully",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "please provide email or password" });
  } else {
    User.findOne({ email: email }).then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "invalid username or password" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            // res.json({message:"successfully signin"})
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            const { _id, name, email, followers, following, pic, savedPost } =
              savedUser;
            res.json({
              token,
              user: { _id, name, email, followers, following, pic, savedPost },
            });
          } else {
            return res.status(422).json({ error: "invalid email or password" });
          }
        })
        .catch((err) => {
          console.log("Bcrypt comparison error:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        });
    });
  }
});

router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.status(422).json({ error: "user does not found may be" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "huk971516@gmail.com",
          subject: "reset password",
          html: `
          <p>you  requested for password reset</p>
          <h5>click in <a href="${WEB_URL}/reset/${token}">link</a></h5>
          `,
        });
        res.json({ massage: "check your mail" });
      });
    });
  });
});

router.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "session end,try again" });
      }
      bcrypt.hash(newPassword, 12).then((hashpassword) => {
        user.password = hashpassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((saveduser) => {
          res.json({ message: "password save success" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
