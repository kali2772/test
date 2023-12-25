import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import "../../componentCss/explore.css";

const Savedpost = () => {
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/getsavepost", {
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

  return (
    <div id="main">
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

export default Savedpost;
