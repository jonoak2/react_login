import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { InputAnimated } from "../UI/input/Input";
import Button from "../UI/button/Button";
import Logo from "../logo/Logo";
import db, { auth } from "../firebase";
import { useHistory } from "react-router";
// import { useHistory } from 'react-router-dom'

const SignUp = () => {
  // db.collection('users').where('email', '==', 'ktk@gma.com').get()
  //     .then(snapshot => {
  //         if (!snapshot.empty) {
  //             alert("person with the given email already exists")
  //             return;
  //         }
  //     })

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [last, setLast] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  // const inputs = [
  //     { lable: "Enter Email ", state: setEmail, value: email },
  //     { lable: "Enter Password ", state: setPassword, value: password },
  //     { lable: "Enter Name ", state: setName, value: name }
  // ]
  function signup(e) {
    // e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        console.log(u);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // const registerClickHandler = () => {
  //   console.log(name.length);
  //   if (!name.length > 3) {
  //     alert("Name must be atleast 4 chars long");
  //     return;
  //   }
  //   //  alert("ok")
  //   try {
  //     db.collection("testUsers")
  //       .where("email", "==", email)
  //       .get()
  //       .then((snapshot) => {
  //         if (snapshot.empty) {
  //           console.log("In");
  //           alert("person with the given email already exists");
  //           return;
  //         }
  //       });

  //     db.collection("users").add({
  //       email: email,
  //       name: name,
  //       password: password,
  //       imageUrl: ""
  //     });
  //     alert("Successfully registered");
  //     history.push("/login");
  //   } catch (e) {
  //     console.log(e.message);
  //     alert(e.message);
  //   }
  // };
  // console.log("COUNT >>>>  ",count)
  const nextButtonHandler = () => {
    if (count === 0) {
      // don't remember from where i copied this code, but this works.
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(email)) {
        // this is a valid email address
        // call setState({email: email}) to update the email
        // or update the data in redux store.

        db.collection("users")
          .where("email", "==", email)
          .get()
          .then((snapshot) => {
            if (!snapshot.empty) {
              alert("person with the given email already exists");
              setCount(count - 1);

              return;
            }
          });
      } else {
        // invalid email, maybe show an error to the user.
        alert("Please enter a valid email address");
        return;
      }
    } else if (count === 1) {
      // console.log(password.length)
      if (password !== confirmPassword || password.length === 0) {
        alert("Passwords do not match");
        return;
      } else setLast(true);
    }

    setCount(count + 1);
  };

  let input = (
    <InputAnimated
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      label="Enter Email "
    />
  );
  if (count === 1) {
    input = (
      <>
        <InputAnimated
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Enter Password "
        />
        <InputAnimated
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm Password"
        />
      </>
    );
  } else if (count === 2) {
    input = (
      <InputAnimated
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Enter Name "
      />
    );
  }

  return (
    <div className="register-page">
      <div className="register-box">
        <Logo className="register-page__logo" />
        <h2 className="heading--tertiary register-page__heading">
          Create Account
        </h2>
        <div className="register-page__input-box">{input}</div>
        {last ? (
          <Button
            disabled={name.length < 3}
            onClick={signup}
            className="register-page__btn"
          >
            Register
          </Button>
        ) : (
          <Button onClick={nextButtonHandler} className="register-page__btn">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignUp;
