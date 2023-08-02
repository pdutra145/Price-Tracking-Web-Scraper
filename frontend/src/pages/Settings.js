import React from "react";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';


const SettingsPage = () => {
    return (
        <Grid container lg={12} justifyContent={"center"} my={10}>
            <Typography variant="span" ><Link to={"/dashboard"}><DashboardIcon /> Dashboard</Link></Typography>
            <Typography variant="h2" component={"h1"} textAlign={"center"} m={5}>
                Settings Page
            </Typography>
        </Grid>
    );
};

export default SettingsPage;
