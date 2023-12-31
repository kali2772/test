import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../componentCss/signin.css";
import useBasicFunc from "../utility";

const Reset = () => {
  const navicate = useNavigate();
  const [email, setEmail] = useState("");
  const { showToast } = useBasicFunc();

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
          showToast(data.error, "error");
          // console.log(data);
        } else {
          showToast(data.massage, "success");
          // console.log(data);
          navicate("/signin");
        }
      })
      .catch((err) => {
        showToast("something went wrong plz try again letter", "error");
        // console.log("error", err);
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

        <button
          onClick={() => PostData()}
          className="btn"
          style={{ width: "auto" }}
        >
          reset-password
        </button>
      </div>
    </div>
  );
};

export default Reset;
