import { Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsOption from "../components/settings/Option";
import useSettings from "../hooks/Settings";

const SettingsPage = () => {
  const { options } = useSettings();
  return (
    <Grid container justifyContent={"center"} my={10}>
      <Typography variant="p">
        <Link to={"/dashboard"}>
          <DashboardIcon /> Dashboard
        </Link>
      </Typography>
      <Grid item lg={8} justifyContent={"center"} alignItems={"center"}>
        <Typography variant="h4" component={"h1"} textAlign={"center"}>
          Settings
        </Typography>
        <Grid container direction={"column"} my={5}>
          <SettingsOption options={options} />
          <Divider />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SettingsPage;
