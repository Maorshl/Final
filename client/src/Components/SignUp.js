import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import useStyles from "../Style/index";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
  Typography,
} from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        target="_blank"
        color="inherit"
        href="https://www.linkedin.com/in/maor-shlomo-27a8931bb/"
      >
        Maor Shlomo
      </Link>{" "}
      {"& "}
      <Link
        target="_blank"
        color="inherit"
        href="https://www.linkedin.com/in/gil-naaman-518738203/"
      >
        Gil Naaman
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const classes = useStyles();
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [redirect, setRedirect] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://ec2-3-80-252-156.compute-1.amazonaws.com:8080/user/create",
        {
          user: { userName, password, email },
        }
      );
      if (response.status === 201) {
        setRedirect(true);
      } else {
        setTryAgain(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paperSignUp}>
        <Avatar className={classes.avatarSignUp}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.formSignUp} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                autoComplete="Uname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {tryAgain && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="secondary">
                  Wrong username or password please try again!
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            onClick={createUser}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
