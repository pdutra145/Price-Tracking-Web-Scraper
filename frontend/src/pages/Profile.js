import React from "react";
import { Grid, Typography as Item, Box, Avatar, styled } from "@mui/material";
import DashboardLink from "../components/DashboardLink";
import Navbar from "../components/Navbar";

const ProfileInfo = styled("p")({
  fontSize: "1.6rem",
  "& span": {
    fontWeight: 700,
  },
});

const ProfilePage = () => {
  return (
    <Navbar>
      <Grid item lg={12} margin={"2rem"}>
        {" "}
        <DashboardLink />
      </Grid>

      {/* <Grid item lg={12}>
        <Typography variant="h3" textAlign={"center"}>
          Profile
        </Typography>
      </Grid> */}

      <Grid
        container
        item
        lg={6}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Grid item xs alignSelf={"center"}>
          <Avatar
            alt="profile image"
            sx={{ width: "10rem", height: "10rem" }}
          />
        </Grid>
        <Grid
          container
          item
          flexDirection={"column"}
          xs
          justifyContent={"start"}
          lineHeight={3}
        >
          <ProfileInfo>
            Username: <span>Pedro</span>
          </ProfileInfo>
          <ProfileInfo>Name:</ProfileInfo>
          <ProfileInfo>Joined In:</ProfileInfo>
        </Grid>
      </Grid>
    </Navbar>
  );
};

export default ProfilePage;
