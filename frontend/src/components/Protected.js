import { AuthContext } from "../context/Auth";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const navigation = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn);
  console.log(Cookies.get("google_token"))


  useEffect(() => {
    setIsLoggedIn(Cookies.get("google_token"))

    console.log(Cookies.get("google_token"))

    if (!isLoggedIn) {
      navigation("/auth");
    }
  }, [isLoggedIn, navigation]);

  return props.children;
};

export default ProtectedRoute;
