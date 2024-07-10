import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";

//Firebase Imports
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [authErrorMessage, setAuthErrorMessage] = useState(null)

  const email = useRef(null); //{current: undefined} <- default
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setAuthErrorMessage(null);
  };

  const handleButtonClick = () => {
    //Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    //SignIn and SignUp Code
    if (message) return;
    //SignIn, SignUp Logic
    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "   " + errorMessage);
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          
          const message = "auth/invalid-credential Firebase: Error (auth/invalid-credential)."
          if(message===errorCode + ' '+ errorMessage){
            const errMsg = "Invalid Credentials"
            setAuthErrorMessage(errMsg);
          }
        });
    }
  };

  return (
    <div>
      <img
        className="absolute h-full w-full"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/be90e543-c951-40d0-9ef5-e067f3e33d16/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="background"
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 rounded-sm absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-85"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 m-2 w-full bg-gray-700"
            required
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 m-2 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 m-2 w-full bg-gray-700"
        />
        <p className="text-red-600 pl-2 text-lg">{errorMessage}</p>
        <p className="text-red-200 pl-2 text-lg">{authErrorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="p-4 my-5 ml-2 w-full rounded-lg bg-red-700"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="hover: cursor-pointer ml-3" onClick={toggleSignInForm}>
          {isSignInForm
            ? "Don't have an account, create one"
            : "Already registered? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
