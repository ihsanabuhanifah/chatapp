// export const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

import axios from "./axios";
import catchErrors from "../../utils/catchErrors";
import Router from "next/router";
import cookie from "js-cookie";

export const registerUser = async (
  user,
  profilePicUrl,
  setError,
  setLoading,
) => {
  setLoading(true);
  try {
    const res = await axios.post(`/signup`, {
      user,
      profilePicUrl,
    });
    setToken(res.data);
  } catch (err) {
    const errorMsg = catchErrors(err);
    setError(errorMsg);
  }
  setLoading(false);
};

export const loginUser = async ( user, setError, setLoading ) => {
  setLoading(true);
  try {
    const res = await axios.post(`/login`, {
      user,
    });
    setToken(res.data);
  } catch (err) {
    const errorMsg = catchErrors(err);
    setError(errorMsg);
  }
  setLoading(false);
};

const setToken = (token) => {
  cookie.set("token", token);
  Router.push("/");
};
