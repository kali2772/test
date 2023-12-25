const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");
const cloudinary = require("../cloudinary");

router.get("/allpost", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name pic")
    // .populate("postedBy.pic", "url")
    .populate("comments.postedBy", "_id name pic")
    .populate("likes.postedBy", "_id name pic")
    .sort("-createdAt")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getsubspost", requireLogin, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name pic")
    .populate("comments.postedBy", "_id name pic")
    .populate("likes.postedBy", "_id name pic")
    .sort("-createdAt")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getsavepost", requireLogin, (req, res) => {
  Post.find({ _id: req.user.savedPost })
    .populate("postedBy", "_id name pic") /* 
    .populate("comments.postedBy", "_id name pic")
    .populate("likes.postedBy", "_id name pic") */
    // .sort("-createdAt")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/posts/:postId", requireLogin, async (req, res) => {
  try {
    await Post.find({ _id: req.params.postId })
      .populate("postedBy", "_id name pic")
      .populate("comments.postedBy", "_id name pic")
      .then((posts) => {
        res.json({ posts });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/* router.get("/posts/:postId", requireLogin, async (req, res) => {
  try {
    await Post.findOne({ _id: req.params.postId })
      .populate("postedBy", "_id name pic")
      .populate("comments.postedBy", "_id name pic")
      .then((posts) => {
        res.json({ posts });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}); */

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name followers following pic")
    .sort("-createdAt")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, pic, cii } = req.body;
  if (!title || !body || !pic) {
    console.log(title, body, pic);
    return res.status(422).json({ error: "please add all the fields" });
  }
  req.user.password = undefined;

  const post = new Post({
    title,
    body,
    photo: pic,
    postedBy: req.user,
    cii,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", requireLogin, (req, res) => {
  try {
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
      .populate("comments.postedBy", "_id name pic")
      .populate("postedBy", "_id name pic")
      .then((err, result) => {
        if (err) {
          console.log(err);
          return res.status(200).json({ likes: err });
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

router.put("/unlike", requireLogin, (req, res) => {
  try {
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
      .populate("comments.postedBy", "_id name pic")
      .populate("postedBy", "_id name pic")
      .then((err, result) => {
        if (err) {
          return res.status(200).json({ likes: err });
        } else {
          console.log(result);
          res.status(422).json(result);
        }
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.put("/comment", requireLogin, (req, res) => {
  try {
    const comment = {
      text: req.body.text,
      postedBy: req.user,
    };
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    )
      .populate("comments.postedBy", "_id name pic")
      .populate("postedBy", "_id name pic")
      .then((result) => {
        if (result) {
          console.log(result, "success");
          return res.json({ comments: result });
        }
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.delete("/deletepost/:postId/:cii", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .then((post) => {
      if (post) {
        if (post.postedBy._id.toString() === req.user._id.toString()) {
          post.deleteOne().catch((err) => {
            console.log(err, "hello");
          });
        }
        cloudinary.api
          .delete_resources([req.params.cii], {
            type: "upload",
            resource_type: "image",
          })
          .then("this", console.log, "this");
        return res.json({ deletionP: post });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
