import { AuthContext } from "../context/Auth";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useOAuth from "../hooks/Auth";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

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

  return (
    <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
      <Outlet />
    </Grid>
  );
};

export default ProtectedRoute;
