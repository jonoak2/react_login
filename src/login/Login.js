import React, { useState, useEffect } from "react";
import Logo from "../logo/Logo";
import "./Login.css";
import { InputAnimated } from "../UI/input/Input";
import Button from "../UI/button/Button";
import { auth } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@material-ui/core";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [, /*checkBox*/ setCheckBox] = useState(false);
  // const [check, setCheck] = useState(false);

  // useEffect(() => {
  //   // Get current user
  //   // console.log("user check>>>>",localStorage.getItem('user'))
  //   if (localStorage.getItem("user")) history.push("/dashboard");
  //   //
  // }, []);

  function login(e) {
    // e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <Logo className="login-page__logo" />
        <h2 className="heading--tertiary login-page__heading">Sign in</h2>
        <div className="login-page__input-box">
          <InputAnimated
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Enter Email "
          />
          <InputAnimated
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Enter Password "
          />
        </div>
        <div className="login-page__signup-btn-box">
          <FormControlLabel
            className=""
            value="calenderdate"
            control={<Checkbox color="primary" />}
            label="Remember me"
            labelPlacement="end"
            onChange={(e) => setCheckBox(e.target.checked)}
          />
          <p>
            Don't have an account! <Link to="/signup">SignUp</Link>
          </p>
        </div>
        {email && password ? (
          <Button disabled={false} onClick={login} className="login-page__btn">
            Login
          </Button>
        ) : (
          <Button disabled={true} className="login-page__btn">
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Login;
