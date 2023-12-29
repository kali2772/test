import React, { useState, useEffect, useContext } from "react";
import useBasicFunc from "../utility";
import { UserContext } from "../../App";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../componentCss/explore.css";

const Savedpost = () => {
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const navicate = useNavigate();
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

  const { share, savePost, likePost, unlikePost, deletepost, makeComments } =
    useBasicFunc();

  const handleLikePost = (postId) => {
    likePost(postId)
      .then((result) => {
        updateStateAfterOperation(postId, result);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  const handleUnlikePost = (postId) => {
    unlikePost(postId)
      .then((result) => {
        updateStateAfterOperation(postId, result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCommentPost = (comment, postId) => {
    makeComments(comment, postId)
      .then((result) => {
        updateStateAfterOperation(postId, result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletePost = (postId, cii) => {
    deletepost(postId, cii)
      .then((result) => {
        const newData = data.filter(
          (item) => item._id !== result.deletionP._id
        );
        setData(newData);
        navicate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlesavePost = (postId) => {
    savePost(postId)
      .then((updatedUser) => {
        const updatedData = data.map((post) => {
          if (post._id === postId) {
            return post;
          }
          return post;
        });
        dispatch({ type: "SAVED_POST", payload: postId });
        setData(updatedData);
        console.log("Updated Data:", updatedData);
      })
      .catch((err) => {
        console.log("Error saving post:", err);
      });
  };
  const updateStateAfterOperation = (postId, updatedPostData) => {
    const updatedData = data.map((post) => {
      if (post._id === postId) {
        return updatedPostData;
      } else {
        return post;
      }
    });
    setData(updatedData);
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
                    onClick={() => handleDeletePost(item._id, item.cii)}
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
                      className="post-icon"
                      onClick={() => {
                        handleUnlikePost(item._id);
                      }}
                    />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/nvcseljlaxcj9hiolzwg.png"
                      alt=""
                      style={{filter: "invert(0)"}}
                      className="post-icon"
                      onClick={() => {
                        handleLikePost(item._id);
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
                        handlesavePost(item._id);
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
                    style={{ color: "#1b1a1a" }}
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
                      handleCommentPost(e.target[0].value, item._id);
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
