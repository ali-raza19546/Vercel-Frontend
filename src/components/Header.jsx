import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, LogOut } from "lucide-react";

function Header() {
  // mujhy log out pr without refresh login dekhana he aur login pr log out dikhana he without refresh
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  const handlLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };
  return (
    <header className="navBarRes bg-white shadow-md md:px-6 md:py-4 sticky top-0 flex items-center z-50 justify-between">
      <Link to={"/postlist"}>
        <h1 className="text-2xl font-bold text-blue-600">UMEXA</h1>
      </Link>

      <div className="flex items-center gap-4">
        {!isLogin ? (
          <>
            <Link
              to={"/login"}
              className="flex items-center gap-2 bg-blue-500 text-white px-3 cursor-pointer py-1.5 rounded-lg hover:bg-blue-600 transition"
            >
              <LogIn size={18} />
              Login
            </Link>

            <Link
              to={"/signup"}
              className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 cursor-pointer rounded-lg hover:bg-green-600 transition"
            >
              <UserPlus size={18} />
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handlLogout}
            className="flex items-center  bg-red-500 text-white px-3 py-1.5 cursor-pointer rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
