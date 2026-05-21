import React from "react";
import { useState } from "react";
import { handleSuccess, handleError } from "../utils/utils.js";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleOnChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://backend-sm-liard.vercel.app/api/login",
        loginForm,
        { withCredentials: true },
      );
      if (data.success) {
        let { token, user } = data;
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            user,
          }),
        );
        localStorage.setItem("token", token);
        setLoading(false);
        handleSuccess(data.message);

        navigate("/postlist");
      }
    } catch (err) {
      handleError(err.response.data.message);
    }
  };
  return (
    <div className="border md:mx-auto sm:mx-0 sm:w-full  md:w-2/5 mt-30 py-7 px-5">
      <h2 className="text-center font-bold text-2xl mb-5">Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          id="username"
          value={loginForm.username}
          onChange={handleOnChange}
          className="border border-zinc-500 p-2 w-full mb-5 mt-1 rounded-md shadow-md"
        />
        <label htmlFor="password">Passowrd</label>
        <input
          type="text"
          placeholder="Password"
          name="password"
          id="password"
          value={loginForm.password}
          onChange={handleOnChange}
          className="border border-zinc-500 p-2 shadow-md rounded-md w-full  mt-1"
        />
        <button className="bg-green-700 cursor-pointer px-2 text-lg w-full mt-3 py-1 hover:bg-green-600 duration-300 ">
          {loading ? `Logging In... ${(<Loader size={17} />)}` : "Login"}
        </button>
        <p className="text-center mt-4 text-md text-zinc-700">
          Don't have Account:{" "}
          <Link className="text-blue-500 font-semibold" to={"/signup"}>
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
