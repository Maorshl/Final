import { useState } from "react";
import "../Style/App.css";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      {user && <AppBar />}
      {!user && <SignIn setUser={setUser} />}
    </div>
  );
}

export default App;
