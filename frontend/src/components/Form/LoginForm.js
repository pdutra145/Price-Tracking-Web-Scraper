import React, { useState } from "react";
import {
  OutlinedInput,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  // styled,
  // FilledInput,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Form } from "react-router-dom";

const LoginForm = () => {
  const [data, setData] = useState({
    email: undefined,
    password: undefined,
  });

  const [showPassword, setShowPassword] = useState(false);
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Form>
        <Grid
          container
          justifyContent={"center"}
          flexDirection={"column"}
          // width={"30%"}
          gap={3}
        >
          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput id="email" variant="outlined" type="text" />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
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
        </Grid>
      </Form>
    </Grid>
  );
};

export default LoginForm;
