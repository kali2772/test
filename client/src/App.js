/* import logo from './logo.svg';
import './App.css'; */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, createContext, useReducer, useContext } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./component/navbar";
import Home from "./component/screen/Home";
import Profile from "./component/screen/Profile";
import Posts from "./component/screen/Posts";
import UserProfile from "./component/screen/UserProfile";
import Explore from "./component/screen/Explore";
import Savedpost from "./component/screen/Savedpost";
import Signup from "./component/screen/Signup";
import Signin from "./component/screen/Signin";
import Reset from "./component/screen/Reset";
import NewPassword from "./component/screen/NewPassword";
import CreatePost from "./component/screen/CreatePost";
import SubscribeUserPost from "./component/screen/SubscribeUserPost";
import { reducer, initialState } from "./reducers/userReducers";

export const UserContext = createContext();

const Routing = () => {
  const history = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  useEffect(
    () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        dispatch({ type: "USER", payload: user });
        // history("/");
      } else {
        if (
          !location.pathname.startsWith("/reset") &&
          !location.pathname.startsWith("/signup")
        ) {
          history("/signin");
        }
      }
    },
    [
      dispatch,
      history,
      location.pathname,
    ] /* if any issue arrived undo text dispatch, history, location.pathname*/
  );
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route exact path="/Profile" element={<Profile />} />

      <Route path="/Explore" element={<Explore />} />

      <Route path="/Savedpost" element={<Savedpost />} />

      <Route path="/Signup" element={<Signup />} />

      <Route path="/Signin" element={<Signin />} />

      <Route path="/Reset" element={<Reset />} />

      <Route path="/Reset/:token" element={<NewPassword />} />

      <Route path="/CreatePost" element={<CreatePost />} />

      <Route path="/Profile/:userid" element={<UserProfile />} />

      <Route path="/Posts/:postid" element={<Posts />} />

      <Route path="/myFollowingpost" element={<SubscribeUserPost />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <hr />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
