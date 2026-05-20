import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, PlusSquare, Menu, X } from "lucide-react";

function SideBar() {
  const [isModel, setIsModel] = useState(false);
  return (
    <>
      {isModel && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          onClick={() => setIsModel(false)}
        ></div>
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black z-50 transform transition-transform duration-300 ease-in-out ${isModel ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static `}
      >
        <div className="flex justify-end p-4  md:hidden"></div>
        <div className="p-5 border-b flex justify-between text-zinc-400 mt-5 md:mt-0">
          <h2 className="text-xl font-semibold text-white">Navigation</h2>

          <button onClick={() => setIsModel(false)}>
            <X size={24} className="text-white md:hidden" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to={"/postlist"}
            className="flex items-center text-white gap-3 p-2 rounded-lg hover:bg-blue-700  font-medium transition"
          >
            <Home size={20} />
            Home
          </Link>

          <Link
            to={"/createpost"}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700 text-white font-medium transition"
          >
            <PlusSquare size={20} />
            Create Post
          </Link>
        </nav>
        <div className="p-4 border-t text-zinc-400">
          <h3 className="font-semibold mb-3 text-white">Inner Sidebar</h3>

          <div className="space-y-2">
            <div className="bg-zinc-900 py-2 px-3 text-zinc-200 rounded-lg text-md">
              Trending Topics
            </div>

            <div className="bg-zinc-900 py-2 px-3 text-zinc-200 rounded-lg text-md">
              Friend Requests
            </div>

            <div className="bg-zinc-900 py-2 px-3 text-zinc-200 rounded-lg text-md">
              Notifications
            </div>
          </div>
        </div>
      </aside>
      {/* Mobile Sidebar Button */}
      <div className="md:hidden fixed bottom-5 left-5 z-50">
        <button
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg"
          onClick={() => setIsModel(true)}
        >
          <Menu />
        </button>
      </div>
    </>
  );
}

export default SideBar;
