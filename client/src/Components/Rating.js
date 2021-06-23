import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const userName = Cookies.get("userName");
function Rating({ id }) {
  const [isRated, setIsRated] = useState(false);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const getRaters = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/rating?id=${id}&userName=${userName}`
      );
      setIsRated(data);
      //   console.log(data);
    };
    getRaters();
  }, []);
  return <div>{isRated ? "rated" : "didntRated"}</div>;
}

export default Rating;
