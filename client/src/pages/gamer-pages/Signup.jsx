import React, { useState,useEffect } from 'react'
import PreLoader from '../../components/gamer-components/utils/PreLoader';
import { Link, useNavigate} from 'react-router-dom';
import useFetch from '../../hooks/useFetch-gamer';
import signup_style from '../../styles/signup.css';
import FacebookIcon from "@mui/icons-material/Facebook";
//import GoogleIcon from "@mui/icons-material/Google";

const Signup = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [fetchData , {loading} ]= useFetch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { url: `/auth/register`, method: "post", data: formData };
   // console.log(config)
    fetchData(config).then((data) => {
      console.log(data.userId)
      // localStorage.setItem('tempuid',data.userId)
      localStorage.setItem('verify',true)
      localStorage.removeItem('token')
      navigate("/verify",{ state: { id: data.userId, email: data.email } });
    })
    .catch(error => {
      // Handle the error here, e.g., log the error or display an error message
      console.error('Error fetching tasks:', error);
    });

    
  };

  
  return (
    <>

    {loading ? <PreLoader />:
   
      <div className={`box ${darkMode ? 'dark-mode' : ''}`}>
        
        <div className='form-wrapper'>
       
          <form className='p-5' style={{height:"40rem"}}>
            <figure>
              <a href="/" className="logo_account custom-logo">
                <img
                  src="assets/img/logo.svg"
                  alt=""
                  width="140"
                  height="35"
                  className="light"
                />
              </a>
            </figure>
            <div className="access_social">
            <div className="access_social">
            <a href="#0" className="social_bt facebook">
                  <span className="icon-wrapper">
                    <FacebookIcon
                      sx={{ fontSize: 30 }}
                      className="square-icon"
                    />
                  </span>
                  <span className="button-text">Register with Facebook</span>
                </a>

                <a href="#0" className="social_bt google">
                  <span className="icon-wrapper">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      alt="Google"
                      className="google-icon"
                    />
                  </span>
                  <span className="button-text">Register with Google</span>
                </a>
						</div>
            </div>
            <div className="divider">
              <span>Or</span>
            </div>
            <div className="mb-3">
              <input type="text" className="form-control grey-border" name='userName' defaultValue={formData.userName} autoComplete='off' onChange={handleChange} autoFocus placeholder='username' style={{color:"black"}}/>
            </div>
            <div className="mb-3">
              
              <input type="text" className="form-control grey-border" name='email' value={formData.email} autoComplete='off' onChange={handleChange} placeholder='Email' style={{color:"black"}}/>
            </div>
            <div className="mb-3">
             
              <input type="text" className="form-control grey-border" name='password' value={formData.password} autoComplete='off' onChange={handleChange} placeholder='Password' style={{color:"black"}}/>
            </div>
            <div className="mb-3">
              
              <input type="text" className="form-control grey-border" name='confirmpassword' value={formData.confirmpassword} autoComplete='off' onChange={handleChange} placeholder='Confirm Password' style={{color:"black"}}/>
            </div>  
            <button type="button" className="btn button btn-lg" onClick={handleSubmit} >Register Now!</button>

            <div className='pt-4' style={{marginTop:"0px"}}>
              <Link to="/gamer-login" className='navigate'><center>Already have an account? Sign In</center></Link>
            </div>
          </form>
        </div>
        <div className="image-wrapper">
          <img src="assets/img/bg.png" alt="loading" width={100 + "%"} height={740 + "px"} />
        </div>
      </div>
    }
    </>
  );
}

export default Signup;
