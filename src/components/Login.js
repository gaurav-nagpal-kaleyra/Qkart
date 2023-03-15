import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
<<<<<<< HEAD
import { useHistory, Link, useLocation } from "react-router-dom";
=======
import { useHistory, Link } from "react-router-dom";
>>>>>>> e7ef4956fa0d9eed00ff1db4b4fed8bbb6626109
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
<<<<<<< HEAD
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
=======

>>>>>>> e7ef4956fa0d9eed00ff1db4b4fed8bbb6626109
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async () => {
    // making post request with axios
    const formData = { username: username, password: password };
    if (validateInput(formData)) {
      const url = config.endpoint + "/auth/login";
      setLoading(true);
      axios
        .post(url, formData)
        .then((res) => {
          enqueueSnackbar("Logged in successfully", {
            variant: "success",
            autoHideDuration: 2000,
          });

          persistLogin(res.data.token, res.data.username, res.data.balance);
          setLoading(false);
          history.push("/", { from: "Register" });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              enqueueSnackbar(error.response.data.message, {
                variant: "error",
                autoHideDuration: 2000,
              });
            }
          } else {
            enqueueSnackbar(
              "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
              { variant: "error", autoHideDuration: 2000 }
            );
          }
          setLoading(false);
        });
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    if (data.username === "") {
      enqueueSnackbar("Username is a required field", {
        variant: "warning",
        autoHideDuration: 2000,
      });
      return false;
    } else if (data.password === "") {
      enqueueSnackbar("Password is a required field", {
        variant: "warning",
        autoHideDuration: 2000,
      });
      return false;
    } else {
      return true;
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    localStorage.setItem("balance", balance);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={false} />

      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            label="username"
            variant="outlined"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            label="password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button variant="contained" className="button" onClick={login}>
            Login to Qkart
          </Button>
          <Box className="circular">
            {loading ? <CircularProgress color="success" /> : " "}
          </Box>
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="link">
              Register Now
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
