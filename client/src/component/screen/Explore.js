import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import "../../componentCss/explore.css";

const Explore = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(""); // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
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
  const fetchUser = (query) => {
    setSearch(query);
    fetch("/search-user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div id="main">
      <div className="search">
        <input
          type="text"
          style={{ margin: "2px" }}
          placeholder="search"
          value={search}
          onChange={(e) => fetchUser(e.target.value)}
        />
        {console.log(search)}
        <button>
          <img
            className="addp-logo"
            src="https://res.cloudinary.com/dxndplrix/image/upload/v1702498777/intaIcon/w62pwkhrgclwcvmrjya2.png"
            alt="search"
            style={{ height: "14px" }}
          />
          search
        </button>
      </div>
      <div className="explorePOst">
        {data.map((item) => {
          return (
            <div className="expost">
              <div className="postData">
                <div className="user-img">
                  <img src={item.postedBy.pic} alt="" className="user-img" />
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
              <Link to={"/posts/" + item._id} className="fullScreen">
                <img
                  src={item.photo}
                  alt="not available"
                  className="expostImg"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;
