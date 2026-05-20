import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function notFound() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-zinc-200 justify-center p-4 text-center">
        <img
          src="../public/images/notfound.jpg"
          alt=""
          className="w-64 h-60 animate-pulse mb-6"
        />
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <h3 className="text-2xl font-semibold mb-3">
          We can't find that page🕊
        </h3>
        <div className="flex mt-3">
          <Link
            to={"/"}
            className="px-6 py-3 bg-blue-500 rounded-full font-medium text-white hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default notFound;
