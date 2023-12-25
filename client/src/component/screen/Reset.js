import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../componentCss/signin.css";

const Reset = () => {
  const navicate = useNavigate();
  const [email, setEmail] = useState("");

  const PostData = () => {
    fetch("/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
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

  return (
    <div id="signin">
      <div className="card">
        {/* <img src="uhidh.png" alt="logo" className="logo" /> */}
        <h1>wellcome back boss</h1>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <div className="t">
          <div className="r">
            <input type="checkbox" name="" id="" />
            <label for="">remember me</label>
            <br />
          </div>
          <a href="#">forget password</a>
        </div>
        <div className="divi">
          <hr width="100" />
          <h2>or</h2>
          <hr width="100" />
        </div>
        <button onClick={() => PostData()} className="btn">
          reset-password
        </button>
      </div>
    </div>
  );
};

export default Reset;
