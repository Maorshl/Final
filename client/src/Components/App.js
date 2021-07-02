import { useEffect, useState } from "react";
import "../Style/App.css";
import Welcome from "./Welcome";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import AddPost from "./AddPost";
import MyPosts from "./MyPosts";
import NeedToLogin from "./NeedToLogin";
import SavedPosts from "./SavedPosts";

//* In out app we are using "material ui" for style, there for some of our defenition its part of "material ui".

//* The axios interceptors attach for each http request the access token.
//* If the user need new access token, it handles it.

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const refreshToken = Cookies.get("refreshToken");
    const errorRequest = error.response;
    if (errorRequest.status !== 303) {
      return error;
    }
    const originalRequest = error.config;
    try {
      const { accessToken } = await getNewToken(refreshToken);
      Cookies.set("token", `${accessToken}`, { expires: 1 });
      const originalResponse = await axios(originalRequest);
      return originalResponse;
    } catch (error) {
      console.log(error);
    }
  }
);
axios.interceptors.request.use(async function (config) {
  const token = await Cookies.get("token");
  config.headers.Authorization = "Bearer " + token;
  return config;
});
async function getNewToken(refToken) {
  try {
    const token = await axios.post("http://localhost:8080/user/refreshToken", {
      refToken: refToken,
    });
    return token.data;
  } catch (error) {
    console.log(error);
  }
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const refreshToken = Cookies.get("refreshToken");
    const userName = Cookies.get("userName");
    if (token && refreshToken && userName) {
      setUser({ userName });
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route exact path="/addPost">
            {user ? <AddPost setUser={setUser} /> : <NeedToLogin />}
          </Route>
          <Route exact path="/myPosts">
            {user ? <MyPosts setUser={setUser} /> : <NeedToLogin />}
          </Route>
          <Route exact path="/savedPosts">
            {user ? <SavedPosts setUser={setUser} /> : <NeedToLogin />}
          </Route>
          <Route path="/">
            {user && <Welcome setUser={setUser} />}
            {!user && <SignIn setUser={setUser} />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
