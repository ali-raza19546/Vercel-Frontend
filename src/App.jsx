import { Outlet } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import SideBar from "./components/SideBar.jsx";
import PostList from "./pages/PostList.jsx";
import PostCreate from "./components/PostCreate.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import NotFound from "./pages/NotFound.jsx";

// Note => ager token expire he to login pr redirect kro

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <div className="main flex h-screen">
          <SideBar />

          <div className="con flex-1 overflow-y-auto">
            <Header />
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/postlist" element={<PostList />} />
              {/* Private Route without token not access */}
              <Route
                path="/createpost"
                element={
                  <PrivateRoute>
                    <PostCreate />
                  </PrivateRoute>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
