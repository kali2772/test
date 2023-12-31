import React, { useEffect, useState, useContext } from "react";
import "../../componentCss/profile.css";
import { Link } from "react-router-dom";
import useBasicFunc from "../utility";
import { UserContext } from "../../App";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const { showToast } = useBasicFunc();

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
      });
  }, []);

  const updateDp = () => {
    if (image) {
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
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
              ocii: state.pic,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              // console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
              showToast("pic update successfully", "success");
            });
        })

        .catch((err) => {
          showToast("error", "error");
          console.log(err);
        });
      // console.log(url, "heloo");
    } // eslint-disable-next-line
  };

  return (
    <>
      {profile ? (
        <div id="profile">
          <div className="user-profile">
            <div className="sec1">
              <div className="profilePIc">
                <img
                  src={state ? state.pic : "loading.."}
                  alt=""
                  className="picImg"
                />
              </div>
              <div className="userData">
                <div className="counting">
                  <p className="postCount">{profile.mypost.length}</p>
                  <p>post</p>
                  {/* {console.log(state.following.length )} */}
                </div>
                <div
                  className="counting mobcound"
                  style={{ paddingLeft: "10px" }}
                >
                  <p className="followerCount">
                    {state ? state.followers.length : "0"}
                  </p>
                  <p>follower</p>
                </div>
                <div className="counting">
                  <p className="followingCount">
                    {state ? state.following.length : "0"}
                  </p>
                  <p>following</p>
                </div>
              </div>
            </div>
            <div className="sec2">
              <h2>{state ? state.name : "process.."}</h2>
              <h3>{state ? state.email : "process.."}</h3>
              {/* {console.log(state)} */}
              {/* <h3>_username</h3> */}
              <input
                type="file"
                name="createpost"
                id=""
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button onClick={() => updateDp()}>edit</button>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate vel expedita dolorum velit dolor harum minima a
                laboriosam voluptatibus nostrum, vitae autem, unde veritatis
                necessitatibus aperiam pariatur natus aspernatur iste.
              </p>
            </div>
          </div>
          <hr />
          <div className="user-posts">
            {profile.mypost.map((item) => {
              return (
                <div className="userpost">
                  <Link to={"/posts/" + item._id} className="fullScreen">
                    <img
                      src={item.photo}
                      alt={item.title}
                      className="userpostImg"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h2>loding...</h2>
      )}
    </>
  );
};

export default Profile;
