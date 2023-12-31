// toastUtils.js
import React, { useState } from "react";
import { toast } from "react-toastify";
const useBasicFunc = () => {
  const [data, setData] = useState([]);
  const WEB_URL = process.env.WEB_URL || "https://sizugram.onrender.com";
  const showToast = (msg, toastType) => {
    toast[toastType](msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const share = (postid) => {
    try {
      const shareurl = `${WEB_URL}/posts/${postid}`;
      navigator.clipboard.writeText(shareurl);
      showToast("Copied to clipboard", "success");
    } catch (error) {
      console.log(error);
      showToast("Failed to copy to clipboard", "error");
    }
  };
  const savePost = (id) => {
    return fetch("/savepost", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.savepost));
        showToast("post is saved", "success");
        return result.savepost;
      })
      .catch((err) => {
        console.log(err);
        showToast("sorry, but something wents wrong", "error");
      });
  };
  const deletepost = (postid, cii) => {
    // console.log(postid, cii);
    return fetch(`/deletepost/${postid}/${cii}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        cii,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        showToast("Post is deleted", "success");
        return result;
      });
  };
  const likePost = (id) => {
    return fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = result.likes;
        setData(newData);
        return newData;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    return fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = result.likes;
        setData(newData);
        return newData;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result.likes._id) {
            return result.likes;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }; */
  const makeComments = (text, postId) => {
    return fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = result.comments;
        showToast("comment post", "success");
        setData(newData);
        return newData;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    showToast,
    share,
    savePost,
    likePost,
    unlikePost,
    deletepost,
    makeComments,
  };
};

export default useBasicFunc;
