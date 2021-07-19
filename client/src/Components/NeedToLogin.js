import React from "react";
import error403 from "../Style/Images/403error.jpg";

function NeedToLogin(props) {
  return (
    <div>
      <h1>Hi!</h1>
      <h2>Sorry but to see this page you have to login...</h2>
      <img src={error403} height="512" width="512"></img>
    </div>
  );
}

export default NeedToLogin;
