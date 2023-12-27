const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");
const cloudinary = require("../cloudinary");
const User = mongoose.model("User");

/* if you want show email on profile you simply do all select to
.select("-password -email") to .select("-password") */

router.get("/user/:id", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .then((posts) => {
          res.json({ user, posts });
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    })
    .catch((err) => {
      return res.status(456).json({ error: "user not found" });
    });
});

router.put("/follow", requireLogin, (req, res) => {
  try {
    console.log(req.user._id, req.body.followId);
    User.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followers: req.user._id },
      },
      {
        new: true,
      }
    )
      .select("-password -email")
      .then((result, err) => {
        if (err) {
          console.log(err);
          return res.status(422).json({ error: err });
        } else {
          console.log(result, "success");
          // res.json(result);
          User.findByIdAndUpdate(
            req.user._id,
            {
              $push: { following: req.body.followId },
            },
            { new: true }
          )
            .select("-password -email")
            .then((result) => {
              console.log(result, "success");
              res.json(result);
            })
            .catch((err) => {
              console.log("error:", err);
              return res.status(422).json({ error: err });
            });
        }
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.put("/unfollow", requireLogin, (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.body.followId,
      {
        $pull: { followers: req.user._id },
      },
      {
        new: true,
      }
    )
      .select("-password -email")
      .then((result, err) => {
        if (err) {
          console.log(err);
          return res.status(422).json({ error: err });
        } else {
          console.log(result, "success");
          // res.json(result);
          User.findByIdAndUpdate(
            req.user._id,
            {
              $pull: { following: req.body.followId },
            },
            { new: true }
          )
            .select("-password -email")
            .then((result) => {
              console.log(result, "success");
              res.json(result);
            })
            .catch((err) => {
              console.log("error:", err);
              return res.status(422).json({ error: err });
            });
        }
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.put("/updatepic", requireLogin, (req, res) => {
  try {
    try {
      const opic = req.body.ocii;
      const opicarr = opic.split("/");
      const ociiarr = opicarr[opicarr.length - 1];
      const checko = opicarr[opicarr.length - 2];
      const ocii = ociiarr.split(".")[0];
      if (checko != "app") {
        cloudinary.api.delete_resources([ocii], {
          type: "upload",
          resource_type: "image",
        });
        console.log(ocii, "done");
      } else {
        console.log(opic, "default image cant replace on cloud");
      }
    } catch (error) {
      console.log(error);
    }
    User.findByIdAndUpdate(
      req.user._id,
      { $set: { pic: req.body.pic } },
      { new: true }
    )
      .then((result) => {
        console.log(result, "success");
        res.json(result);
      })
      .catch((err) => {
        console.log("error:", err);
        return res.status(422).json({ error: err });
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/savepost", requireLogin, (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { savedPost: req.body.postId },
      },
      {
        new: true,
      }
    )
      /* .populate("comments.postedBy", "_id name pic")
      .populate("postedBy", "_id name pic") */
      .select("-password -resetToken -expireToken")
      .then((err, result) => {
        if (err) {
          console.log(err);
          return res.status(200).json({ savepost: err });
        } else {
          console.log(result, "success");
          res.status(422).json(result);
        }
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/search-user", (req, res) => {
  let userPattern = new RegExp("^" + req.body.query);
  User.find({ email: { $regex: userPattern } })
    .select("_id email")
    .then((user) => {
      console.log({ user });
      res.json({ user: user });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
