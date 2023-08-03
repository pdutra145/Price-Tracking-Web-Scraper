import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { common, indigo } from "@mui/material/colors";

import { AuthContext } from "../context/Auth";
import { useContext, useState } from "react";
import useOAuth from "../hooks/Auth";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import styled from "@emotion/styled";

const theme = createTheme({
  palette: {
    primary: indigo,
    dark: common.black,
  },
});

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  // { name: "Team", href: "#", current: false },
  // { name: "Projects", href: "#", current: false },
  // { name: "Calendar", href: "#", current: false },
  // { name: "Reports", href: "#", current: false },
];

const ButtonLink = styled(Button)({
  color: "white",
  borderColor: "white",
  backgroundColor: indigo[700],
  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
});

export default function Navbar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { userInfo, isLoggedIn } = useContext(AuthContext);
  const { signOut } = useOAuth();

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "/settings" },
    { name: "Sign out", href: "/auth", onClick: signOut },
  ];

  return (
    <ThemeProvider theme={theme}>
      {" "}
      <AppBar position="static" className="mb-10" color={"primary"}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Grid container sx={{ flexGrow: 1 }} gap={5}>
            <Typography variant="h6" component="div">
              Perseus
            </Typography>
            <ButtonLink variant="text">
              <Link to="/dashboard">Dashboard</Link>
            </ButtonLink>
          </Grid>
          {isLoggedIn && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                onClose={handleClose}
                open={Boolean(anchorEl)}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>
                  <Link to={"/settings"}>Settings</Link>
                </MenuItem>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Box mx={10}>{props.children}</Box>
    </ThemeProvider>
  );
}
