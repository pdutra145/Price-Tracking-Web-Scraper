import { AuthContext } from "../context/Auth";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useOAuth from "../hooks/Auth";

const ProtectedRoute = (props) => {
  const navigation = useNavigate();
  const { checkAccessToken } = useOAuth();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    setIsLoggedIn(checkAccessToken(Cookies.get("access_token")));

    if (!isLoggedIn) {
      navigation("/auth");
    }
  }, []);

  return props.children;
};

export default ProtectedRoute;
