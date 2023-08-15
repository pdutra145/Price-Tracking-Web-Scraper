import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import Dashboard from "@mui/icons-material/Dashboard";

const StyledLink = styled(Link)({
  padding: 10,
  fontSize: "medium",
});

const DashboardLink = () => {
  return (
    <StyledLink to="/dashboard">
      <Dashboard /> Dashboard
    </StyledLink>
  );
};

export default DashboardLink;
