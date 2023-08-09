import React, { useState } from "react";
import {
  OutlinedInput,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  Link,
  // styled,
  // FilledInput,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Form } from "react-router-dom";
import useOAuth from "../../hooks/Auth";

const AuthForm = (props) => {
  const [data, setData] = useState({
    email: undefined,
    password: undefined,
    name: undefined,
  });
  const [auth, setAuth] = useState({
    isLoggin: true,
    url: process.env.REACT_APP_AUTH_LOGIN,
  });
  console.log(auth);
  const { onAuth } = useOAuth();

  const [showPassword, setShowPassword] = useState(false);
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Form onSubmit={(e) => onAuth(e, data, auth.url)}>
        <Grid
          container
          justifyContent={"center"}
          flexDirection={"column"}
          // width={"30%"}
          gap={3}
        >
          {!auth.isLoggin && (
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <OutlinedInput
                id="name"
                variant="outlined"
                type="text"
                value={data.name}
                onChange={(e) =>
                  setData((curr) => ({ ...curr, name: e.target.value }))
                }
              />
            </FormControl>
          )}
          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              variant="outlined"
              type="text"
              value={data.email}
              onChange={(e) =>
                setData((curr) => ({ ...curr, email: e.target.value }))
              }
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(e) =>
                setData((curr) => ({ ...curr, password: e.target.value }))
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((curr) => !curr)}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Grid item>
            <Link
              href="#"
              underline="hover"
              onClick={() =>
                setAuth((curr) => ({
                  url: !curr.isLoggin
                    ? process.env.REACT_APP_AUTH_LOGIN
                    : process.env.REACT_APP_AUTH_SIGNUP,
                  isLoggin: !curr.isLoggin,
                }))
              }
            >
              Don't have account
            </Link>
          </Grid>
          <Grid item lg={6} alignSelf={"center"}>
            <Button type="submit" variant="contained">
              {auth ? "Login" : "Signup"}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Grid>
  );
};

export default AuthForm;
