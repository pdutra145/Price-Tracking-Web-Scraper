import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingContext } from "../context/Loading";

const useOAuth = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserInfo } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);

  async function onSuccess({ provider, data }) {
    setLoading(true);
    console.log(`LOGGED IN SUCCESSFULLY with ${provider}`, data);

    Cookies.set("google_token", data.access_token);

    setIsLoggedIn(true);

    const user = {
      id: data.id,
      picture: data.picture,
      name: data.name,
      email: data.email,
    };
    setUserInfo(user);

    try {
      const res = await axios.post("http://localhost:8393/auth/callback", user);

      console.log(res);

      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
      navigate("/auth");
    }
    setLoading(false);
    navigate("/dashboard");
  }

  function onFailure(res) {
    setIsLoggedIn(false);
    console.log("LOGGED IN FAILED", res);
  }

  function signOut() {
    console.log("out");
    Cookies.remove("google_token");
    setIsLoggedIn(false);
    setUserInfo({});
  }

  return { onSuccess, onFailure, signOut };
};

export default useOAuth;
