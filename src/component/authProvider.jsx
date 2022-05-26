import { useEffect } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../config/api";
import { useDispatch } from "react-redux";
import user_types from "../redux/type/user";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const refreshPage = async () => {
    const cookie = Cookies.get("auth_token");
    if (cookie) {
      try {
        const keepLogin = await axiosInstance.get("/auth/keep_login");

        const newCookie = keepLogin?.data?.result?.token;

        Cookies.set("auth_token", newCookie || "");

        dispatch({
          type: user_types.LOGIN_USER,
          payload: keepLogin?.data?.result?.user,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    refreshPage();
  }, []);

  return children;
};

export default AuthProvider;
