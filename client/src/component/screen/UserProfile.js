import React, { useEffect, useState, useContext } from "react";
import "../../componentCss/profile.css";
import { UserContext } from "../../App";
import {useParams} from 'react-router-dom'

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  // console.log(userid);
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // setpics(result.mypost);
        // console.log(result)
        setProfile(result);
      }); // eslint-disable-next-line
  }, []);

  const followUser = ()=>{
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user",JSON.stringify(data))
        setProfile((prevState)=>{
          return{
            ...prevState,
            user:{
              ...prevState.user,
              followers:[...prevState.user.followers,data._id]
            }
          }
        })
      });
  }
  const unfollowUser = ()=>{
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          const newfFollower = prevState.user.followers.filter(
            // eslint-disable-next-line
            (item) => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newfFollower,
            },
          };
        });
      });
  }

  return (
    <>
      {userProfile ? (
        <div id="profile">
          <div className="user-profile">
            <div className="sec1">
              <div className="profilePIc">
                {/* {console.log(userProfile.user.pic)} */}
                <img
                  src={userProfile.user.pic}
                  alt=""
                  className="picImg"
                />
              </div>
              <div className="userData">
                <div className="counting">
                  <p className="postCount">{userProfile.posts.length}</p>
                  <p>post</p>
                </div>
                <div className="counting">
                  <p className="followerCount">
                    {userProfile.user.followers.length}
                  </p>
                  <p>follower</p>
                </div>
                <div className="counting">
                  <p className="followingCount">
                    {userProfile.user.following.length}
                  </p>
                  <p>following</p>
                </div>
                <br />
                {
                  /* {console.log(userProfile.user.followers,state._id)} */
                  userProfile.user.followers.includes(state._id) ? (
                    <button onClick={() => unfollowUser()}>unfollow</button>
                  ) : (
                    <button onClick={() => followUser()}>follow</button>
                  )
                }
              </div>
            </div>
            <div className="sec2">
              <h2>{userProfile.user.name}</h2>
              <h3>{userProfile.user.email}</h3>
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
            {userProfile.posts.map((item) => {
              return (
                <div className="userpost">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="userpostImg"
                  />
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
