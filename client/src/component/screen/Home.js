import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../componentCss/home.css";

const Home = () => {
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);

  const showToast = (msg, toastType) => {
    toast[toastType](msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {
    fetch("/allpost", {
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

  const share = (postid) => {
    try {
      const shareurl = `http://localhost:5000/posts/${postid}`;
      navigator.clipboard.writeText(shareurl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      {/* =====================story feature comming soon=======================  */}
      {/* <div id="story">
        <div className="story">
          <img src="" alt="" className="user-profile" />
        </div>
        <div className="story">
          <img src="" alt="" className="user-profile" />
        </div>
        <div className="story">
          <img src="" alt="" className="user-profile" />
        </div>
        <div className="story">
          <img src="" alt="" className="user-profile" />
        </div>
        <div className="story">
          <img src="" alt="" className="user-profile" />
        </div>
        <div className="story">
          <img src="" alt="" className="user-profile" />
        </div>
        <div className="story">
          <img src="" alt="" className="user-profile" />
        </div>
        <div className="story">
          <img src="" alt="" className="user-profile" />
        </div>
        <div className="story">
          <img src="" alt="" className="user-profile" />
        </div>
      </div> */}
      {/* =====================post-card======================= */}

      <div id="post">
        {data.map((item) => {
          return (
            <div className="post">
              <div className="full-discry">{item.body}</div>
              <div className="main-post">
                <div className="post-card">
                  <div className="post-item post-creator">
                    <div className="linkeble">
                      <div className="user-img">
                        <img
                          src={item.postedBy.pic}
                          alt=""
                          className="user-img"
                        />
                      </div>
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
                    </div>
                    {
                      // eslint-disable-next-line
                      item.postedBy._id == state._id && (
                        <button onClick={() => deletepost(item._id, item.cii)}>
                          <img
                            className="addp-logo"
                            src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/k4uptampczd3pc94v35k.png"
                            alt="delete post"
                          />
                        </button>
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
                          src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/dwezu95opublhnp3nzdt.png"
                          alt=""
                          className="post-icon"
                          onClick={() => {
                            unlikePost(item._id);
                          }}
                        />
                      ) : (
                        <img
                          src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/nvcseljlaxcj9hiolzwg.png"
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
                    <div className="like intr-item">
                      <img
                        src="https://res.cloudinary.com/dxndplrix/image/upload/v1702923423/intaIcon/iijhp7ydfavelqipin0p.png"
                        alt=""
                        className="post-icon"
                        onClick={() => {
                          share(item._id);
                        }}
                      />
                      {/* <p className="count">500shares</p> */}
                    </div>
                  </div>
                  <div className="post-item post-det">
                    <div className="discri">
                      <p>
                        <span>discription : </span>
                        {item.body}
                      </p>
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
                      </form>
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
                    <p className="comment-count">
                      {item.comments.length} comments
                    </p>
                  </div>
                  {/* -------post date-time feature comming soon-- */}
                  {/* <p className="post-date">9 day ago</p> */}
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
