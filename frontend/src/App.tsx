import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/landingPage/Home";
import Login from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ScrollToTop from "./ScrollToTop";
import Dashboard from "./pages/admin/Dashboard";
import SidebarParent from "./pages/SidebarParent";
import Shipment from "./pages/admin/Shipment";
import ShipmentDetails from "./components/shipment/ShipmentDetails";
import Tracking from "./pages/admin/Tracking";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Login />} />

          {/* Admin Routes */}

          <Route path="/" element={<SidebarParent />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/shipment" element={<Shipment />} />
            <Route path="/shipment-details" element={<ShipmentDetails />} />
            <Route path="/tracking" element={<Tracking />} />
          </Route>
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
