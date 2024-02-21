import React from "react";
import "./Cancel.css";

function Cancel() {
  return (
    <>
      <h1 className="cancel-h1">Your Stripe payment was cancelled!</h1>
      <h3>
        Forgot to add something to your cart? Shop around then come back to pay!
      </h3>
    </>
  );
}

export default Cancel;
