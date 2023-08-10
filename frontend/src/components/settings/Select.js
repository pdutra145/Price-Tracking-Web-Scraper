import { Select, MenuItem } from "@mui/material";
import useSettings from "../../hooks/Settings";

const SettingsSelect = (props) => {
  const { dispatch } = useSettings();

  const handleChange = (event) => {
    const newValue = event.target.value;

    dispatch({ type: `set_${props.option}`, payload: newValue });
    localStorage.setItem(props.option, newValue);
  };

  return (
    <>
      <Select
        value={localStorage.getItem(props.option)}
        onChange={handleChange}
      >
        {props.items &&
          props.items.map((item, idx) => (
            <MenuItem key={idx} value={item}>
              {item}
            </MenuItem>
          ))}
      </Select>
    </>
  );
};

export default SettingsSelect;
