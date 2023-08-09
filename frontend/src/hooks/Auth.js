import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingContext } from "../context/Loading";

const useOAuth = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserInfo, userInfo } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);

  async function checkAccessToken(token) {
    const id = userInfo.id;
    try {
      const res = await axios.get(process.env.REACT_APP_GET_USER_URL + id);

      console.log(res);

      return res.data.user.access_token === token;
    } catch (error) {
      throw new Error(`Error when trying to get user ${id}: ${error}`);
    }
  }

  async function onAuth(e, data, url) {
    e.preventDefault();
    setLoading(true);

    setIsLoggedIn(true);

    const userData = {
      name: data.name || "",
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(url, userData);

      console.log("Auth Callback Message:", res.data.message);

      console.log({ ...res.data.user });

      Cookies.set("access_token", res.data.user.access_token);

      setLoading(false);
      setUserInfo((curr) => ({ ...curr, ...res.data.user }));
      console.log(userInfo);
      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
      navigate("/auth");
    }
  }

  async function onSuccessGoogle({ provider, data }) {
    setLoading(true);
    console.log(`LOGGED IN SUCCESSFULLY with ${provider}`, data);

    Cookies.set("access_token", data.access_token);

    setIsLoggedIn(true);

    const user = {
      id: data.id,
      picture: data.picture,
      name: data.name,
      email: data.email,
      access_token: data.access_token,
      auth_provider: provider,
      email_confirmed: data.email_verified,
    };

    console.log(user);

    try {
      const res = await axios.post(
        process.env.REACT_APP_GOOGLE_AUTH_CALLBACK,
        user
      );

      console.log("Auth Callback Message:", res.data.message);

      setLoading(false);
      setUserInfo((curr) => ({ ...curr, ...res.data.user }));
      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
      navigate("/auth");
    }
  }

  function onFailure(res) {
    setIsLoggedIn(false);
    console.log("LOGGED IN FAILED", res);
  }

  function signOut() {
    console.log("out");
    Cookies.remove("access_token");
    setIsLoggedIn(false);
    setUserInfo({});
    navigate("/auth");
  }

  return { onSuccessGoogle, onAuth, onFailure, signOut, checkAccessToken };
};

export default useOAuth;
