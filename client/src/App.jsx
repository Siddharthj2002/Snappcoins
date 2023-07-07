import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import "../src/styles/author.css";

import Home from "./pages/general-pages/Home";
import Connect from "./pages/general-pages/Connect-wallet";
import Catalog from "./pages/general-pages/Catalog";

import Login from "./pages/gaming-vendor-pages/Partner-login";
import Dashbaord from "./pages/gaming-vendor-pages/Partner-home";
import Settings from "./pages/gaming-vendor-pages/Partner-settings";

import Profile from "./pages/merchant-pages/Profile";
import MerchantHome from "./pages/merchant-pages/Home";
import Signup from "./pages/merchant-pages/Signup";
import MerchantLogin from "./pages/merchant-pages/Login";
import Verify from "./pages/merchant-pages/Verify";

import GamerHome from "./pages/gamer-pages/Home";
import GamerProfile from "./pages/gamer-pages/profile";
import GamerSignup from "./pages/gamer-pages/Signup";
import GamerLogin from "./pages/gamer-pages/Login";
import GamerVerify from "./pages/gamer-pages/Verify";
import GamerDetailsPage from "./pages/gamer-pages/DetailsPage";

function App() {
  const merchantState = useSelector((state) => state.merchantReducer);
  const isVerify = localStorage.getItem("verify");

  const gamerState = useSelector((state) => state.gamerReducer);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/catalog" element={<Catalog />} />

        <Route path="/gaming-vendor-login" element={<Login />} />
        <Route path="/gaming-vendor-dashboard" element={<Dashbaord />} />
        <Route path="/gaming-vendor-settings" element={<Settings />} />

        <Route
          path="/merchant-profile"
          element={
            merchantState.isLoggedIn ? (
              <Profile />
            ) : (
              <Navigate to="/merchant-login" />
            )
          }
        />
        <Route
          path="/merchant-dashboard"
          element={
            merchantState.isLoggedIn ? (
              <MerchantHome />
            ) : (
              <Navigate to="/merchant-login" />
            )
          }
        />
        <Route path="/merchant-signup" element={<Signup />} />
        <Route path="/merchant-login" element={<MerchantLogin />} />
        <Route
          path="/merchant-verify"
          element={isVerify ? <Verify /> : <Navigate to="/merchant-login" />}
        />

        <Route exact path="/gamer-dashboard" element={<GamerHome />} />
        <Route path="/gamer-profile" element={<GamerProfile />} />
        {/* <Route
          path="/gamer-dashboard"
          element={gamerState.isLoggedIn ? <GamerHome /> : <Navigate to="/gamer-login" />}
        /> */}
        <Route path="/gamer-signup" element={<GamerSignup />} />
        <Route path="/gamer-login" element={<GamerLogin />} />
        <Route path="/gamer-verify" element={<GamerVerify />} />
        <Route path="/gamer-details-page" element={<GamerDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
