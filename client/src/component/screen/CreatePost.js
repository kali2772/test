import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBasicFunc from "../utility";
import "../../componentCss/createpost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const navicate = useNavigate();
  const { showToast } = useBasicFunc();

  const handleCreatePost = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("body", body);

    if (image && title && body) {
      fetch("/createpostfile", {
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          navicate("/");
          if (data.error) {
            console.log(data.error);
            showToast(data.error, "error");
          } else {
            showToast(data.message, "success");
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } else {
      showToast("please add all fields", "error");
    }
    // eslint-disable-next-line
  };

  return (
    <div id="create">
      <div className="card">
        <div className="sec">
          <img
            src={image ? URL.createObjectURL(image) : ""}
            alt="preview screen"
            className="preview"
          />
        </div>
        <div
          className="sec sec2"
          style={{ paddingLeft: "16px", marginTop: "0px" }}
        >
          <div className="det">
            <label for="title">
              title
              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <br />
            <label for="discription">
              discription
              <input
                type="text"
                placeholder="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </label>
            <input
              type="file"
              name="createpost"
              id=""
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          {
            <button
              type="submit"
              className="subtn"
              onClick={() => handleCreatePost()}
            >
              post
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
