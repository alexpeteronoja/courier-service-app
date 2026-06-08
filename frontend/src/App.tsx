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
import Tracking from "./pages/admin/Tracking";
import ShipmentDetails from "./pages/admin/ShipmentDetails";
import Staff from "./pages/admin/Staff";
import Profile from "./pages/admin/Profile";
import Settings from "./pages/admin/Settings";

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
            <Route
              path="/shipment-details/:shipmentId"
              element={<ShipmentDetails />}
            />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
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
        limit={2}
        theme="light"
      />
    </>
  );
}

export default App;
