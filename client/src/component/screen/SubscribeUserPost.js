import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import "../../componentCss/home.css";

const Home = () => {
  const [data, setData] = useState([]); // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/getsubspost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result.likes._id) {
            return result.likes;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result.likes._id) {
            return result.likes;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComments = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result.comments._id) {
            return result.comments;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletepost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result.deletionP._id;
        });
        setData(newData);
      });
  };

  return (
    <div className="home">
      <div id="post">
        {data.map((item) => {
          return (
            <div className="post">
              <div className="full-discry">{item.body}</div>
              <div className="main-post">
                <div className="post-card">
                  <div className="post-item post-creator">
                    <div className="user-img"></div>
                    <Link
                      className="user-name"
                      to={
                        item.postedBy._id !== state._id
                          ? "/profile/" + item.postedBy._id
                          : "/profile"
                      }
                    >
                      {item.postedBy.name}
                    </Link>
                    {
                      // eslint-disable-next-line
                      item.postedBy._id == state._id && (
                        <button onClick={() => deletepost(item._id)}>d</button>
                      )
                    }
                  </div>
                  <div className="post-item post-img-contain">
                    <img
                      src={item.photo}
                      alt="not available"
                      className="post-img"
                    />
                    <Link to={"/posts/" + item._id} className="fullScreen">
                      <img
                        key="fullScreen"
                        className="addp-logo"
                        src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/pbhz7q6xxjctyw6vi4w1.png"
                        alt="fullpost"
                      />
                    </Link>
                  </div>
                  <div className="post-item post-intr">
                    <div className="comment intr-item">
                      {item.likes.includes(state._id) ? (
                        <img
                          src=""
                          alt=""
                          className="post-icon"
                          onClick={() => {
                            unlikePost(item._id);
                          }}
                        />
                      ) : (
                        <img
                          src=""
                          alt=""
                          className="post-icon"
                          onClick={() => {
                            likePost(item._id);
                          }}
                        />
                      )}

                      <p className="count">{item.likes.length} likes</p>
                    </div>
                    <div className="share-story intr-item">
                      <img src="" alt="" className="post-icon" />
                    </div>
                    <div className="like intr-item">
                      <img src="" alt="" className="post-icon" />
                      <p className="count">500likes</p>
                    </div>
                  </div>
                  <div className="post-item post-det" onclick="postview()">
                    <div className="discri">
                      <p>
                        <span>discription : </span>
                        {item.body}
                      </p>
                      {item.comments.map((record) => {
                        return (
                          <p>
                            {record.postedBy.name}
                            {record.text}
                          </p>
                        );
                      })}
                    </div>
                    <div className="comment">
                      <p>
                        <span>comments : </span>
                      </p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          makeComments(e.target[0].value, item._id);
                        }}
                      >
                        <input className="commenti" type="text" />
                        <p className="comment-count">200+</p>
                      </form>
                    </div>
                  </div>
                  <p className="post-date">9 day ago</p>
                </div>
              </div>
              <div className="full-commy"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
