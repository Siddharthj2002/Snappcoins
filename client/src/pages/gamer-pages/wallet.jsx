import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import useFetch from '../../hooks/useFetch-gamer';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob:"",
    email: "",
    password: "",
    phoneNumber:"",
    gender:"",
   
  });

  const fetchData = useFetch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const config = { url: `/auth/register`, method: "post", data: formData };
   // console.log(config)
    fetchData(config).then((data) => {
      console.log(data.userId)
      // localStorage.setItem('tempuid',data.userId)
      navigate("/verify",{ state: { id: data.userId, email: data.email } });
    })
    .catch(error => {
      // Handle the error here, e.g., log the error or display an error message
      console.error('Error fetching tasks:', error);
    });


  }


  return (
    <div>
      <div className='container shadow'>
        <div className='form-wrapper'>
          <form className='shadow p-5'>
            <h1 className='mb-5'>Signup </h1>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" name='firstName' value={formData.firstName} autoComplete='off' onChange={handleChange} autoFocus />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" name='lastName' value={formData.lastName} autoComplete='off' onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input type="date" className="form-control" name='dob' value={formData.dob} onChange={handleChange} />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="text" className="form-control" name='password' value={formData.password} autoComplete='off' onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input type="text" className="form-control" name='email' value={formData.email} autoComplete='off' onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input type="text" className="form-control" name='phoneNumber' value={formData.phoneNumber} autoComplete='off' onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select className='form-control' name='gender' value={formData.gender} onChange={handleChange}>
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            
            <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit} >Submit</button>

            <div className='pt-4'>
              <Link to="/gamer-login" className='text-blue-400'>Already have an account? Login here</Link>
            </div>

          </form>
        </div>
      </div >
    </div>
  )
}

export default Signup
