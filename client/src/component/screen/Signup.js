import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../componentCss/signup.css";

const Signup = () => {
  const navicate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    if (url) {
      uploadFields();
    } // eslint-disable-next-line
  }, [url]);
  const uploadPic = () => {
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
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadFields = () => {
    fetch("signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          console.log(data);
          navicate("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };
  return (
    <div id="signup">
      <div className="card">
        {/* <img src="uhidh.png" alt="logo" className="logo" /> */}
        <h1 onClick={() => PostData()}>ohh yehh new user</h1>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>upload pic</span>
        <input
          type="file"
          name="createpost"
          id=""
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        <div className="divi">
          <hr width="100" />
          <h2>or</h2>
          <hr width="100" />
        </div>
        <Link to="/signin">have an account</Link>
        <button onClick={() => PostData()} className="btn">
          signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
