import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../componentCss/createpost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [cii, setCII] = useState("");
  const navicate = useNavigate();

  useEffect(() => {
    if (url || cii) {
      fetch("createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
          cii
        }),
      })
        .then((res) => res.json())
        .then(data => {
          if (data.error) {
            console.log(data);
          } else {
            console.log(data);
            navicate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url,cii]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instaClone");
    data.append("cloud_name", "dxndplrix");
    fetch("https://api.cloudinary.com/v1_1/dxndplrix/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Public ID:", data.public_id);
        setCII(data.public_id);
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <button type="submit" className="subtn" onClick={() => postDetails()}>
            post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
