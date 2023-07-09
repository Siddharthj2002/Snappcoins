import './App.css';
import { BrowserRouter,Route, Routes,Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify from './pages/Verify';
import Profile from './pages/profile';
import DetailsPage from './pages/DetailsPage';

import { useSelector } from 'react-redux';


function App() {

  const gamerState = useSelector(state => state.gamerReducer)

  return (
    <>
      <BrowserRouter>
        <Routes>  
         
          <Route exact path="/" element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/" element={gamerState.isLoggedIn?<Home />:<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='/verify' element={<Verify />}/>
          <Route path='/details-page' element={<DetailsPage/>}/>
          
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;