import React from "react";

const UserNavItem = (props) => {
  return (
    <a href={props.href} className={props.className} onClick={props.onClick}>
      {props.name}
    </a>
  );
};

export default UserNavItem;
