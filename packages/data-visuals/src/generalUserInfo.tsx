import React from "react";
import { Container } from "@mui/material";
import Profile from "./img/Profile.png";

export const UserDisplay = () => {
  const ImageMyStyle = {
    maxWidth: "230px",
    maxHeight: "230px",
    flex: 1,
    resizeMode: "contain",
  };

  return <img style={ImageMyStyle} src={Profile} alt="" />;
};
