import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NewNavBar from "./routes-nav/NewNavBar";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import Routes from "./routes-nav/Routes";
import CartProvider from "./NewCartContext";
import LoadingSpinner from "./components/common/LoadingSpinner";
import JustRealFoodApi from "./api/just_real_food_api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("");
  const [isRequestCompleted, setIsRequestCompleted] = useState(false);

  /** Load user info from API. Until a user is logged in and they have a token,
   * this should not run. It only needs to re-run when a user logs out so
   * the value of the token is a dependency for this effect.
   * */

  // useEffect will make an API call everytime the token value changes
  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        // if user has a token:
        if (token) {
          try {
            // deconstruct 'email' from piece of state 'token' (jwt.token() returns an object with the user's information, captured when logging in - the payload)
            let { email } = jwt.decode(token);
            // store the token on the JustRealFoodApi class so can use it to call the API.
            JustRealFoodApi.token = token;
            // assign 'currentUser' to the result of the API call to get the current user with 'email' assigned to the token passed in as a prop
            let currentUser = await JustRealFoodApi.getCurrentUser(email);

            // update pieces of state 'currentUser' with the results of the API call and 'isRequestCompleted' as true
            setCurrentUser(currentUser);
            setIsRequestCompleted(true);

            // if user does not have a token, show the error message and set piece of state 'currentUser' to null
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        // Once user data is fetched or if user does not have a token, change piece of state 'infoLoaded' to true to stop the spinner (LoadingSpinner component will not execute when infoLoaded=true)
        setInfoLoaded(true);
      }

      // set piece of state 'infoLoaded' to false while async function 'getCurrentUser' runs (LoadingSpinner component will execute when infoLoaded=false)
      // once the data is fetched (or even if an error happens), 'infoLoaded' will be set back to false to control the spinner
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  /** Handles site-wide logout. */
  function logout() {
    // when logout, pieces of state 'currentUser' and 'token' are reset to null
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically signs users in (sets token) upon signup.
   *
   */
  async function signup(signupData) {
    try {
      // make API call to 'signup' method and assign response to piece of state 'token'
      let token = await JustRealFoodApi.signup(signupData);
      // update piece of state 'token' with the API response
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login  */
  async function login(loginData) {
    try {
      // make API call to 'login method' and assign response to piece of state 'token'
      let token = await JustRealFoodApi.login(loginData);
      // update piece of state 'token' with the API response
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  // if piece of state 'infoLoaded' is false, render the LoadingSpinner component to show Loading ...
  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          isRequestCompleted,
        }}
      >
        {/* everything within CartProvider has access to CartContext (includes piece of state 'cartProducts' as well as the functions for getting, adding and subtracting product quantities, deleting products and getting total cart costs) */}
        <CartProvider>
          <Container>
            {/* pass logout() method as a prop so can be used in NavBar component */}
            <NewNavBar logout={logout} />
            {/* pass login() and signup() methods as props so can be used in login and signup routes */}
            <Routes login={login} signup={signup} />
          </Container>
        </CartProvider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
