import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Routes.css";

// import components
import Home from "../components/home/Home";
import SignupAndLoginForms from "../auth/SignupAndLoginForms";
import NewProductList from "../components/products/NewProductList";
import ProductDogOrCatFood from "../components/products/ProductDogOrCatFood";
import NewProductDetail from "../components/products/NewProductDetail";
import Cancel from "../components/Cancel";
import Success from "../components/Success";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Some of the site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * signup(), login() methods defined in NewApp.js file are passed in as props so they can be used in the SignupAndLoginForms component
 *
 * Visiting a non-existant route results in a friendly message asking user to click one of the links in the navBar
 */

function Routes({ signup, login }) {
  return (
    <Switch>
      {/* Route renders Home component when path exactly matches "/" */}
      <Route exact path="/">
        <Home />
      </Route>

      {/* Route renders SignupAndLoginForms component when path exactly matches "/signup" */}
      <Route exact path="/signup">
        <SignupAndLoginForms signup={signup} login={login} />
      </Route>

      {/* Route renders NewProductList component when path exactly matches "/api/products". User does not have to be logged in */}
      <Route exact path="/api/products">
        <NewProductList />
      </Route>

      {/* Route renders NewProductDetail component when path exactly matches "/api/products/:name". User does not have to be logged in */}
      <Route exact path="/api/products/name/:name">
        <NewProductDetail />
      </Route>

      {/* Route renders ProductDogOrCatFood component when path exactly matches "/api/products/category/:category". User does not have to be logged in */}
      <Route exact path="/api/products/category/:category">
        <ProductDogOrCatFood />
      </Route>

      {/* Route renders the Success component when the path exactly matches '/success (used by Stripe to show payment was a success). User must be logged in. */}
      <PrivateRoute exact path="/success">
        <Success />
      </PrivateRoute>

      {/* Route renders the Cancel component when the path exactly matches '/cancel (used by Stripe to show payment was cancelled). User must be logged in.  */}
      <PrivateRoute exact path="/cancel">
        <Cancel />
      </PrivateRoute>

      {/* if a user tries to go to a link isn't one of the above, this friendly message will show up */}
      <Route>
        <div>
          <p className="errorHandler1">
            Hmmm. I can't seem to find what you want.
          </p>
          <p className="errorHandler2">
            Please click on one of the links above.
          </p>
        </div>
      </Route>
    </Switch>
  );
}
export default Routes;
