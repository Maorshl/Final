import { useState } from "react";
import "../Style/App.css";
import AppBar from "./AppBar";
import SignIn from "./SignIn2";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
            {user && <AppBar />}
            {!user && <SignIn setUser={setUser} />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
