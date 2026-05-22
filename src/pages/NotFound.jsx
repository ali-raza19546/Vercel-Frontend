import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function notFound() {
  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          {/* Glowing 404 */}
          <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]">
            404
          </h1>

          {/* Heading */}
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-white">
            Lost in the Social Universe
          </h2>

          {/* Description */}
          <p className="mt-4 text-gray-400 text-lg leading-relaxed">
            Oops! The page you are looking for doesn’t exist or may have been
            removed.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition duration-300">
              Go Home
            </button>
          </div>

          {/* Decorative Glow */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-600/20 blur-3xl rounded-full"></div>
        </div>
      </div>
    </>
  );
}

export default notFound;
