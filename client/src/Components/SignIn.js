import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@material-ui/core/";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "../Style/index";

function Copyright() {
  return (
    <Typography variant="body2" color="initial" align="center">
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

export default function SignInSide({ setUser }) {
  const classes = useStyles();
  const [rememberMe, setRememberMe] = useState(false);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [wrongPassword, setWrongPassword] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/user/login", {
      userName,
      password,
    });
    if (response.status === 200) {
      let expires = null;
      if (rememberMe) {
        expires = 5;
      }
      const { data } = response;

      Cookies.set("token", data.accessToken, { expires });
      Cookies.set("refreshToken", data.newRefreshToken, { expires });
      Cookies.set("userName", data.userName, { expires });
      setUser({ userName });
    } else {
      setWrongPassword(true);
    }
  };

  return (
    <Grid container component="main" className={classes.rootSignIn}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.imageSingIn} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={classes.rightSingIn}
      >
        <div className={classes.paperSingIn}>
          <Avatar className={classes.avatarSingIn}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.formSingIn} noValidate>
            <TextField
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onClick={() => {
                    if (!rememberMe) {
                      setRememberMe(true);
                    } else {
                      setRememberMe(false);
                    }
                  }}
                />
              }
              label="Remember me"
            />
            {wrongPassword && (
              <Typography variant="subtitle2" color="secondary">
                Wrong username or password please try again!
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitSingIn}
              onClick={login}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
