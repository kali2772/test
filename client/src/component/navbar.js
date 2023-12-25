import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../componentCss/navbar.css";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navicate = useNavigate();

  /* const renderList = () => {
    if (state) {
      return [
        <li key={1}>
          <Link to="/" key={1.1}>
            <img
              key={1.11}
              className="addp-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/ecn9rjarqeiqhjgbwxmm.png"
              alt="add post"
            />
            Home
          </Link>
        </li>,
        <li key={2}>
          <Link to="/profile" key={2.1}>
            <img
              key={2.11}
              className="addp-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/ighxzalgav3e5ei6cy5z.png"
              alt="add post"
            />
            Profile
          </Link>
        </li>,
        <li key={3}>
          <Link to="/explore" key={3.1}>
            <img
              key={3.11}
              className="addp-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/rqgxuek1ulpiz3oni1nw.png"
              alt="add post"
            />
            Explore
          </Link>
        </li>,
      ];
    } else {
      return [
        <li key={4}>
          <Link to="/signin" key={4.1}>
            <img
              key={4.11}
              className="addp-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/dauwsioanj4sxla6oqtr.png"
              alt="add post"
            />
            Sign In
          </Link>
        </li>,
        <li key={5}>
          <Link to="/signup" key={5.1}>
            <img
              key={5.11}
              className="addp-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/dauwsioanj4sxla6oqtr.png"
              alt="add post"
            />
            Sign Up
          </Link>
        </li>,
      ];
    }
  }; */

  const renderList = () => {
    if (state) {
      return [
        <li key="nav1">
          <Link to="/" key="link1">
            <img
              key="nav1.1"
              className="addp-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/ecn9rjarqeiqhjgbwxmm.png"
              alt="add post"
            />
            Home
          </Link>
        </li>,
        <li key="nav2">
          <Link to="/profile" key="link2">
            <img
              key="nav2.1"
              className="addp-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/ighxzalgav3e5ei6cy5z.png"
              alt="add post"
            />
            Profile
          </Link>
        </li>,
        <li key="nav3">
          <Link to="/explore" key="link3">
            <img
              key="nav3.1"
              className="addp-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/rqgxuek1ulpiz3oni1nw.png"
              alt="add post"
            />
            Explore
          </Link>
        </li>,
      ];
    } else {
      return [
        <li key="nav4">
          <Link to="/signin" key="link4">
            <img
              key="nav4.1"
              className="addp-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/dauwsioanj4sxla6oqtr.png"
              alt="add post"
            />
            Sign In
          </Link>
        </li>,
        <li key="nav5">
          <Link to="/signup" key="link5">
            <img
              key="nav5.1"
              className="addp-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/dauwsioanj4sxla6oqtr.png"
              alt="add post"
            />
            Sign Up
          </Link>
        </li>,
      ];
    }
  };

  /* const renderMLogout = () => {
    if (state) {
      return [
        <Link
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            navicate("/signin");
          }}
        >
          <img
            className="navm-logo"
            src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/dxjxhxckuoqoj0d9pce1.png"
            alt="add post"
          />
        </Link>,
      ];
    }
  }; */

  const renderMLogout = () => {
    if (state) {
      return [
        <Link
          key="navMLogout"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            navicate("/signin");
          }}
        >
          <img
            key="navMLogout.1"
            className="navm-logo"
            src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/dxjxhxckuoqoj0d9pce1.png"
            alt="add post"
          />
        </Link>,
      ];
    }
  };

  /* const renderMList = () => {
    if (state) {
      return [
        <li key={1}>
          <Link to="/" key={1.1}>
            <img
              key={1.11}
              className="navm-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/ecn9rjarqeiqhjgbwxmm.png"
              alt="add post"
            />
          </Link>
        </li>,

        <li key={2}>
          <Link to="/explore" key={3.1}>
            <img
              key={3.11}
              className="navm-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/rqgxuek1ulpiz3oni1nw.png"
              alt="add post"
            />
          </Link>
        </li>,
        <li key={3}>
          <Link to={"/CreatePost"}>
            <img
              className="navm-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/ehet8aud0lfx9jaawekm.png"
              alt="add post"
            />
          </Link>
        </li>,
        <li key={4}>
          <Link to="/profile" key={2.1}>
            <img
              key={2.11}
              className="navm-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/ighxzalgav3e5ei6cy5z.png"
              alt="add post"
            />
          </Link>
        </li>,
        <li>
          {renderMLogout()}
        </li>,
      ];
    }
  }; */

  const renderMList = () => {
    if (state) {
      return [
        <li key="navM1">
          <Link to="/" key="linkM1">
            <img
              key="navM1.1"
              className="navm-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/ecn9rjarqeiqhjgbwxmm.png"
              alt="add post"
            />
          </Link>
        </li>,
        <li key="navM2">
          <Link to="/explore" key="linkM3">
            <img
              key="navM3.1"
              className="navm-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/rqgxuek1ulpiz3oni1nw.png"
              alt="add post"
            />
          </Link>
        </li>,
        <li key="navM3">
          <Link to={"/CreatePost"} key="linkM4">
            <img
              key="navM4.1"
              className="navm-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/ehet8aud0lfx9jaawekm.png"
              alt="add post"
            />
          </Link>
        </li>,
        <li key="navM4">
          <Link to="/profile" key="linkM2">
            <img
              key="navM2.1"
              className="navm-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/ighxzalgav3e5ei6cy5z.png"
              alt="add post"
            />
          </Link>
        </li>,
        <li key="navM5">{renderMLogout()}</li>,
      ];
    }
  };

  /* const renderLogout = () => {
    if (state) {
      return [
        <button
          className="log"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            navicate("/signin");
          }}
        >
          <img
            className="addp-logo"
            src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/dxjxhxckuoqoj0d9pce1.png"
            alt="add post"
          />
          logout
        </button>,
      ];
    }
  }; */

  const renderLogout = () => {
    if (state) {
      return [
        <button
          key="logoutBtn"
          className="log"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            navicate("/signin");
          }}
        >
          <img
            key="logoutBtn.1"
            className="addp-logo"
            src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/dxjxhxckuoqoj0d9pce1.png"
            alt="add post"
          />
          logout
        </button>,
      ];
    }
  };

  return (
    <>
      {/* <div id="nav">
        <div className="nav-right">
          <img className="nav-logo" src="" alt="insta" />
        </div>
        <div className="nav-mid">
          <Link to={state ? "/CreatePost" : "/signin"}>
            <img
              className="addp-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/ehet8aud0lfx9jaawekm.png"
              alt="add post"
            />
          </Link>
          <Link to={state ? "/myFollowingpost" : "/signin"}>
            <img className="addp-logo" src="" alt="myFollowingpost" />
          </Link>
        </div>
        <div className="nav-left">
          <ul className="nav-item">{renderList()}</ul>
          <div>{renderLogout()}</div>
          <div className="nav-l-icons">
            <div className="notify">
              <img src="" alt="" className="nlicon" />
            </div>
            <div className="menu">
              <img src="" alt="" className="nlicon" />
            </div>
          </div>
        </div>
      </div>
      <div id="navm">
        <ul className="navm-item">{renderMList()}</ul>
      </div> */}

      <div id="nav">
        <div key="navRight" className="nav-right">
          <img key="navLogo" className="nav-logo" src="" alt="insta" />
        </div>
        <div key="navMid" className="nav-mid">
          <Link key="linkCreatePost" to={state ? "/CreatePost" : "/signin"}>
            <img
              key="navLogoMobile"
              className="addp-logo"
              src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/ehet8aud0lfx9jaawekm.png"
              alt="add post"
            />
            add post
          </Link>
        </div>
        <div key="navLeft" className="nav-left">
          <ul key="navItemList" className="nav-item">
            {renderList()}
          </ul>
          <div key="navLogout">{renderLogout()}</div>
          <div key="navIcons" className="nav-l-icons">
            <div key="navNotify" className="notify">
              <Link
                key="linkFollowingPost"
                to={state ? "/myFollowingpost" : "/signin"}
              >
                <img
                  key="navIcon"
                  style={{ height: "32px" }}
                  className="addp-logo"
                  src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/ir5g8j75hsal32plpu4a.png"
                  alt="icon"
                />
              </Link>
            </div>
            <div key="navMenu" className="menu">
              <Link key="linksavedPost" to={state ? "/Savedpost" : "/signin"}>
                <img
                  key="navIcon"
                  style={{ height: "32px" }}
                  className="addp-logo"
                  src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/dr16czyppymjkfgft2ch.png"
                  alt="icon"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div key="navm" id="navm">
        <ul key="navmItemList" className="navm-item">
          {renderMList()}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
