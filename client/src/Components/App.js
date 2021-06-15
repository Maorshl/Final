import { useState } from "react";
import "../Style/App.css";
import AppBar from "./AppBar";
import SignIn from "./SignIn2";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

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
  config.headers.Authorization = "bearer " + token;
  return config;
});
async function getNewToken(refToken) {
  try {
    const token = await axios.post("/user/token", {
      refToken: refToken,
    });
    return token.data;
  } catch (error) {
    console.log(error);
  }
}

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/">
            {user && <AppBar setUser={setUser} />}
            {!user && <SignIn setUser={setUser} />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
