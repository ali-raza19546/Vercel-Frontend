import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../utils/utils.js";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { Loader } from "lucide-react";

function SignUp() {
  // user ka username nikalna he to {user} user.username
  const [pfImage, setPfImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [signUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("pfImage", pfImage);
    fd.append("username", signUpForm.username);
    fd.append("email", signUpForm.email);
    fd.append("password", signUpForm.password);
    try {
      setIsLoading(true);
      if (signUpForm.password === signUpForm.confirmPassword) {
        let resData = await axios.post(
          "https://backend-sm-liard.vercel.app/api/signup",
          fd,
        );
        if (resData.data.success) {
          handleSuccess(resData.data.message);
          setSignUpForm({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        }
        setIsLoading(false);
      } else {
        handleError("password does not match!");
      }
    } catch (error) {
      handleError(error.response.data.message);
    }
  };

  const handleChangeImage = (e) => {
    let file = e.target.files[0];
    if (!file) return;
    setPfImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  return (
    <div className="containerSignup">
      <div className=" pfCircle mr-6 bg-zinc-400 relative rounded-full  w-16 h-16 overflow-hidden flex items-center justify-center ">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt=""
            className="w-full h-full signUpPfImg bg-center overflow-hidden"
          />
        ) : (
          <>
            <input
              type="file"
              id="fileInput"
              className="w-0 opacity-0 h-0 absolute"
              name="pfImage"
              onChange={handleChangeImage}
            />
            <label htmlFor="fileInput" className="text-4xl font-semibold mb-2">
              +
            </label>
          </>
        )}
      </div>
      <div className="border md:w-1/2 sm:w-full  md:mt-19 p-6">
        <h2 className="text-center font-bold text-2xl sm:mt-4 md:mt-0 md:mb-4">
          SignUp
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={signUpForm.username}
            onChange={handleOnChange}
            className="border border-zinc-500 p-2  w-full my-2"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={signUpForm.email}
            onChange={handleOnChange}
            className="border border-zinc-500 p-2 w-full my-2"
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={signUpForm.password}
            onChange={handleOnChange}
            className="border border-zinc-500 p-2 w-full my-2"
          />
          <input
            type="text"
            placeholder="Confirm password"
            name="confirmPassword"
            value={signUpForm.confirmPassword}
            onChange={handleOnChange}
            className="border border-zinc-500 p-2 w-full my-2"
          />
          <button
            className="bg-green-700 cursor-pointer text-lg text-center w-full mt-3 py-1 "
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Submit"}
          </button>
          <p className="text-center mt-4 text-md text-zinc-700">
            Already have Account:{" "}
            <Link className="text-blue-500 font-semibold" to={"/login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
