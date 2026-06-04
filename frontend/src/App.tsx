import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/landingPage/Home";
import Login from "./pages/admin/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Admin Routes */}

          <Route path="/admin" element={<Login />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        limit={1}
        theme="light"
      />
    </>
  );
}

export default App;
