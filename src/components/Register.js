import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";
const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function


const Register = () => {
  const { enqueueSnackbar } = useSnackbar();


  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async () => {
    const data = {
      username: username,
      password: password,
      confirmPassword: cpassword,
    };
    if (validateInput(data)) {
      setLoading(true);
      const url = config.endpoint + "/auth/register";
      const body = {
        username: username,
        password: password,
      };

      axios
        .post(url, body)
        .then((res) => {
          enqueueSnackbar("Registered Successfully", {
            variant: "success",
            autoHideDuration: 2000,
          });
          setLoading(false);
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

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   **/
  const validateInput = (data) => {
    /**
     * Validate the input values so that any bad or illegal values are not passed to the backend.
     *
     * @param {{ username: string, password: string, confirmPassword: string }} data
     *  Object with values of username, password and confirm password user entered to register
     *
     * @returns {boolean}
     *    Whether validation has passed or not
     */
    //  Return false if any validation condition fails, otherwise return true.
    //  (NOTE: The error messages to be shown for each of these cases, are given with them)
    //  Check that username field is not an empty value - "Username is a required field"

    //  Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
    //  Check that password field is not an empty value - "Password is a required field"
    //  Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
    //  Check that confirmPassword field has the same value as password field - Passwords do not match

    if (data.username === "") {
      enqueueSnackbar("Username is a required field", {
        variant: "warning",
        autoHideDuration: 2000,
      });
      return false;
    } else if (data.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
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
    } else if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
        autoHideDuration: 2000,
      });
      return false;
    } else if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Password do not match", {
        variant: "warning",
        autoHideDuration: 2000,
      });
      return false;
    } else {
      return true;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={(e) => {
              setCpassword(e.target.value);
            }}
          />
          <Button className="button" variant="contained" onClick={register}>
            Register Now
          </Button>

          <Box className="circular">
            {loading ? <CircularProgress color="success" /> : " "}
          </Box>
          <p className="secondary-action">
            Already have an account?
            <a className="link" href="#">
              Login here
            </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

}
export default Register;
