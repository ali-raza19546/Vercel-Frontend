import { Link } from "react-router-dom";
import React from "react";

function EmptyPost() {
  return (
    <div>
      <div className="h-screen bg-[#0f0f12] flex items-center justify-center px-6">
        <div className="relative max-w-md w-full">
          {/* Glow Effects */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>

          {/* Card */}
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 text-center shadow-2xl">
            {/* Icon */}
            <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-r from-pink-500 to-purple-600 flex items-center justify-center text-4xl shadow-lg">
              📸
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-3xl font-bold text-white">No Posts Yet</h1>

            {/* Message */}
            <p className="mt-4 text-gray-400 leading-relaxed">
              Your profile is waiting for its first memory. Share moments,
              thoughts, and creativity with the world.
            </p>

            {/* Button */}
            <button className="mt-8 px-8 py-3 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg">
              <Link to="/createpost">Create Your First Post</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyPost;
