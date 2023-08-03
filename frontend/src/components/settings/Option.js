import React from "react";
import { List, ListItem, Typography, Grid, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import SettingsSelect from "./Select";

const SettingsHeader = styled(Typography)({
  textAlign: "start",
  margin: 5,
});

const SettingDescription = styled(Typography)({
  color: grey[600],
});

const SettingGrid = styled(Grid)({
  margin: "1rem 1rem",
});

const SettingsOption = (props) => {
  return (
    <SettingGrid item>
      <SettingsHeader variant="h5" component={"h2"}>
        Search Options
      </SettingsHeader>
      <SettingDescription variant="p" px={5}>
        Choose the default search options
      </SettingDescription>
      <Grid container direction={"row"}>
        <List>
          <ListItem>
            <Typography variant="span" mx={5}>
              Provider
            </Typography>{" "}
            <SettingsSelect option="provider" items={props.options.providers} />
          </ListItem>
          <ListItem>
            <Typography variant="span" mx={5}>
              Currency
            </Typography>{" "}
            <SettingsSelect
              option="currency"
              items={props.options.currencies}
            />
          </ListItem>
        </List>
      </Grid>
    </SettingGrid>
  );
};

export default SettingsOption;
