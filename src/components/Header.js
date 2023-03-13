import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUserName] = useState(null);

  // once the page loads i.e first time check is performed whether user is logged in or not
  useEffect(() => {
    const name = localStorage.getItem("username");

    if (name) {
      setLoggedIn(true);
      setUserName(name);
    }
  }, []);

  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {/* if children props are received then it means to show search bar no
      matter user is logged in or not */}
      {children && (
        <Box className="search-desktop">
          <OutlinedInput
            id="outlined-adornment-search"
            className="search"
            onChange={(event) => {
              children.callApi(event, 500);
            }}
            placeholder="Search for items/categories"
            size="small"
            endAdornment={
              <InputAdornment position="end">
                <Search style={{ color: "#00a278" }} />
              </InputAdornment>
            }
          />
        </Box>
      )}
      {/* if the user is logged in then show logout button */}
      {loggedIn && (
        <Stack direction="row" spacing={2}>
          <Avatar alt={username} src="avatar.png" />
          <div style={{ display: "flex", alignItems: "center" }}>
            {username}
          </div>
          <Button
            className="button"
            variant="contained"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            LOGOUT
          </Button>
        </Stack>
      )}
      {/* if the user is logged out and hasHiddenAuthButtons is true i.e we are
      on the product page with user logged out */}
      {!loggedIn && hasHiddenAuthButtons && (
        <Stack direction="row" spacing={2}>
          <Button
            className="button"
            onClick={() => {
              history.push("/login");
            }}
            variant="contained"
          >
            LOGIN
          </Button>
          <Button
            className="button"
            onClick={() => {
              history.push("/register");
            }}
            variant="contained"
          >
            REGISTER
          </Button>
        </Stack>
      )}
      {/* if this attribute is passed false that means we are on the login or
      register page */}
      {!hasHiddenAuthButtons && (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => {
            history.push("/");
          }}
        >
          Back to explore
        </Button>
      )}
    </Box>
  );
};

export default Header;
