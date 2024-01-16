import React from "react";
import Cookies from "universal-cookie";
import { getCookie } from 'cookies-next';
import { verifyJwtToken } from "../lib/auth";

export const fromServer = async () => {
  let temp = getCookie("token")
  
  // const cookies = require("next/headers").cookies;
  // const cookieList = cookies();
  // cookieList.get("token111 ", cookieList.get("token"))
  // const { value: token } = cookieList.get("token") ?? { value: null };
  // console.log("token122", token);
  // const verifiedToken = await verifyJwtToken(token);

  return temp;
};

// TODO: this `useAuth` creates a vulnerability issue because it needs to have
// verifyJwtToken which works with process.env.JWT_SECRET_KEY which is not
// initially available on the client side. This is why we shouldn't rely on
// this hook if we really don't need to use.
// Alternatively we can have an API route to to verification on the server layer.
export function useAuth() {
  // Have also loading state to not show flickering to user
  const [auth, setAuth] = React.useState(null);

  const getVerifiedtoken = async () => {
    const cookies = new Cookies();
    const token = cookies.get("token") ?? null;
    console.log("TOKEN ", token);
    const verifiedToken = await verifyJwtToken(token);
    setAuth(verifiedToken);
  };

  React.useEffect(() => {
    getVerifiedtoken();
  }, []);

  return auth;
}

// useAuth.fromServer = fromServer;