import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import "../../componentCss/signin.css";
import useBasicFunc from "../utility";

const Signin = () => {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const navicate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useBasicFunc();

  const PostData = () => {
    fetch("signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          showToast(data.error, "error");
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          // console.log(data);
          showToast("you loggin successfully", "success");
          navicate("/");
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
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div className="t">
          <div className="r">
            <input type="checkbox" name="" id="" />
            <label for="">remember me</label>
            <br />
          </div>
          <Link to="/reset">forget password</Link>
        </div>
        <div className="divi">
          <hr width="100" />
          <h2>or</h2>
          <hr width="100" />
        </div>
        <Link to="/signup">don't have an account</Link>
        <button onClick={() => PostData()} className="btn">
          signin
        </button>
      </div>
    </div>
  );
};

export default Signin;
