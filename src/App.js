import React, { useEffect, useState } from "react";
// import ".";
import { Switch, Route, useHistory } from "react-router-dom";

import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import { auth } from "./firebase";
import MyMap from "./my-map/MyMap";
// import store from 'store'
// import db from '../../firebase'

function App() {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    authListener();
  });

  function authListener() {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setUser(user);
        localStorage.setItem("user", user.uid);
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
  }

  // console.log("history>>>>>", history)

  // db.collection('users').doc('ABXOQMYe0gqcptq0ttab')
  //   .onSnapshot( snapshot => console.log(" Data >>>> ",snapshot.data()))

  // const user = store.get('user')
  // let user = localStorage.getItem('user')
  // console.log(user)
  if (localStorage.getItem("user")) {
    history.push("/dashboard");
  }
  // else history.push("/login");

  // if (user) {
  //   history.push("/dashboard");
  // } else history.push("/login");

  function logout() {
    auth.signOut();
    history.push("/");
  }

  return (
    <div className="app">
      <Login />
      <SignUp />
    </div>
  );
}

export default App;
