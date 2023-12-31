import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBasicFunc from "../utility";
import "../../componentCss/signin.css";

const NewPassword = () => {
  const navicate = useNavigate();
  const [password, setPassword] = useState("");
  const { showToast } = useBasicFunc();
  const { token } = useParams();
  console.log(token)

  const PostData = () => {
    fetch("/new-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          showToast(data.error, "error");
          // console.log(data);
        } else {
          /* localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user }); */
          showToast(data.massage, "success");
          // console.log(data);
          navicate("/signin");
        }
      })
      .catch((err) => {
        showToast("something went wrong plz try again letter", "error");
        // console.log(err);
      });
  };

  return (
    <div id="signin">
      <div className="card">
        {/* <img src="uhidh.png" alt="logo" className="logo" /> */}
        <h1>setup new password</h1>

        <input
          type="text"
          placeholder="enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button onClick={() => PostData()} className="btn">
          update password
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
