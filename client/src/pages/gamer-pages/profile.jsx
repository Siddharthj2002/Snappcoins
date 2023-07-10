import React, { useEffect, useState } from "react";
import Navbar from "../../components/gamer-components/Navbar";
import Footer from "../../components/gamer-components/Footer";
import EditProfile from "../../components/gamer-components/EditProfile";
import { gamerProfile } from "../../redux/actions/gamerAction";
import { useDispatch, useSelector } from "react-redux";
import FullpageLoader from "../../components/general-components/FullpageLoader";

const Profile = () => {
  const dispatch = useDispatch();
  const gaming = useSelector((state) => state.gamerReducer);
  const profile = gaming.gamer;

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    dispatch(gamerProfile(profile));
  }, []);

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
    const rootElement = document.documentElement;
    rootElement.classList.toggle("dark-mode");
  };

  return (
    <>
      <FullpageLoader />
      <div className={`profile ${darkMode ? "dark-mode" : ""}`}>
        <Navbar darkMode={darkMode} onDarkModeToggle={handleDarkModeToggle} />
        <div className={`container ${darkMode ? "dark-mode" : ""}`}>
          <div className="card-body">
            <div className="row">
              <EditProfile
                darkMode={darkMode}
                onDarkModeToggle={handleDarkModeToggle}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
