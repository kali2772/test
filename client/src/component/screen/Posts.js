import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useLocation } from "react-router-dom";
import "../../componentCss/explore.css";

const Savedpost = () => {
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const location = useLocation();
  const cu = location.pathname;

  useEffect(() => {
    fetch(`${cu}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setData(result.posts);
      });
  }, [cu]);
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
  const share = (postid) => {
    try {
      const shareurl = `http://localhost:3000/posts/${postid}`;
      navigator.clipboard.writeText(shareurl);
    } catch (error) {
      console.log(error);
    }
  };
  const savePost = (id) => {
    fetch("/savepost", {
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
        console.log("savepost", result);
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
  const deletepost = (postid, cii) => {
    // console.log(postid, cii);
    fetch(`/deletepost/${postid}/${cii}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        cii,
      }),
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
  return (
    <div id="main " className="post-main">
      {data.map((item) => {
        return (
          <>
            <div className="explorePOst post-firs">
              <img
                src={item.photo}
                alt="not available"
                className="post-expostImg"
              />
              {
                // eslint-disable-next-line
                item.postedBy._id == state._id && (
                  <button
                    className="post-delete"
                    onClick={() => deletepost(item._id, item.cii)}
                  >
                    <img
                      className="addp-logo"
                      src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/k4uptampczd3pc94v35k.png"
                      alt="delete post"
                    />
                  </button>
                )
              }
              <div
                className="post-item post-post-intr post-intr"
                style={{ justifyContent: "flex-start" }}
              >
                <div className="likes intr-item">
                  {item.likes.includes(state._id) ? (
                    <img
                      src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/dwezu95opublhnp3nzdt.png"
                      alt=""
                      className="post-icon posticonic"
                      onClick={() => {
                        unlikePost(item._id);
                      }}
                    />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/nvcseljlaxcj9hiolzwg.png"
                      alt=""
                      className="post-icon posticonic"
                      onClick={() => {
                        likePost(item._id);
                      }}
                    />
                  )}
                  {/* <p className="count">{item.likes.length} likes</p> */}
                </div>
                <div className="saved intr-item">
                  {state.savedPost.includes(item._id) ? (
                    <img
                      src="https://res.cloudinary.com/dxndplrix/image/upload/v1702923423/intaIcon/hdj2vgumhujbovxhis7m.png"
                      alt="already saved"
                      className="post-icon"
                    />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/dxndplrix/image/upload/v1702923423/intaIcon/vfjfwmkrjwpinthsxa3g.png"
                      alt=""
                      className="post-icon"
                      onClick={() => {
                        savePost(item._id);
                      }}
                    />
                  )}
                </div>
                <div className="share intr-item">
                  <img
                    src="https://res.cloudinary.com/dxndplrix/image/upload/v1702923423/intaIcon/iijhp7ydfavelqipin0p.png"
                    alt="share"
                    className="post-icon posticonic"
                    onClick={() => {
                      share(item._id);
                    }}
                  />
                </div>
              </div>
              <div className="discri">
                <p>
                  <span>title : </span>
                  {item.title}
                </p>
                <p>
                  <span>discription : </span>
                  {item.body}
                </p>
              </div>
            </div>
            <div className="post-secon">
              <div className="expost">
                <div className="postData post-postData">
                  <Link
                    className="user-name post-user-det"
                    to={
                      item.postedBy._id !== state._id
                        ? "/profile/" + item.postedBy._id
                        : "/profile"
                    }
                    style={{color: "#1b1a1a"}}
                  >
                    <img
                      src={item.postedBy.pic}
                      alt=""
                      className="post-userimg user-img"
                    />
                    {item.postedBy.name}
                  </Link>
                </div>
              </div>

              <div className="post-comment">
                <div className="post-text-comment">
                  <p>
                    <span>comments : </span>
                    <br />
                    {item.comments.length} comments
                  </p>
                  <form
                    className="comment-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      makeComments(e.target[0].value, item._id);
                    }}
                  >
                    <input
                      className="post-commenti"
                      type="text"
                      style={{ margin: 0, textAlign: "left" }}
                    />
                  </form>
                </div>
                <ul>
                  {item.comments.map((record) => {
                    return (
                      <li>
                        <p>
                          {record.postedBy.name}:- {record.text}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Savedpost;
