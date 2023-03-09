import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, useLocation } from "react-router-dom";

const Header = (hasHiddenAuthButtons) => {
  const history = useHistory();
  const location = useLocation();
  

  const HeaderForProductLogOut = () => {
    return (
      <Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            className="explore-button"
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
          <Button variant="contained" onClick={() => history.push("/register")}>
            Register
          </Button>
        </Stack>
      </Box>
    );
  };
  const HeaderForProductLogin = () => {
    return (
      <Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>

        <Stack direction="row" spacing={2}>
          <img alt={localStorage.getItem("username")} src="./avatar.png" />
          <p style={{ marginTop: "15px" }}>{localStorage.getItem("username")}</p>
          <Button
            variant="text"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </Stack>
      </Box>
    );
  };

  const HeaderForLoginAndRegsiter = () => {
    
    return (
      <Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          // variant="text"
          onClick={() => history.push("/")}
        >
          Back To Explore
        </Button>
      </Box>
    );
  };

 if(hasHiddenAuthButtons.hasHiddenAuthButtons){
  return <HeaderForLoginAndRegsiter/>
 }

 else if(localStorage.getItem("username") !== null){
  return <HeaderForProductLogin/>
 }else{
  return <HeaderForProductLogOut/>
 }
};

export default Header;
