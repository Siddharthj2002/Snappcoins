import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../../hooks/useFetch-merchant'
import { merchantProfile } from '../../redux/actions/merchantAction'
import PreLoader from './utils/PreLoader'

const EditProfile = () => {
    const merchandise = useSelector(state => state.merchantReducer)
    const profile = merchandise.merchant

    const [fetchData ,{loading}] = useFetch();
    const dispatch = useDispatch()

    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        setImageSrc(
          profile.image
            ? `${process.env.REACT_APP_URL}/api/profile/img/${profile.image}`
            : "assets/img/avatar-user.jpg"
        );
      }, [profile.image]);

    const initialFormData = {
        firstName : profile.firstName,
        lastName : profile.lastName,
        dob : new Date(profile.dob).toISOString().substr(0, 10),
        companyName: profile.companyName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        gender: profile.gender,
        role: profile.role,
        address: profile.address,
        image:profile.image
    };

    const [formData, setFormData] = useState(initialFormData)

    const handleChange = async(e) => {
        if (e.target.name === "image") {

            console.log(e.target.files[0])
            setFormData({
              ...formData,
              [e.target.name]: e.target.files[0],
            });
          } else {
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
            });
          }
    }

    useEffect(()=>{
        setFormData({
            firstName : profile.firstName,
            lastName : profile.lastName,
            dob : new Date(profile.dob).toISOString().substr(0, 10),
            companyName: profile.companyName,
            email: profile.email,
            phoneNumber: profile.phoneNumber,
            gender: profile.gender,
            role: profile.role,
            address: profile.address,
            image:profile.image
        })
    },[profile,setFormData])

    const handleUpdate = async (e) =>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formDataToSend = new FormData();

        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("dob", formData.dob);
        formDataToSend.append("companyName", formData.companyName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phoneNumber", formData.phoneNumber);
        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("role", formData.role);
        formDataToSend.append("address", formData.address);
        if(typeof(formData.image) !== 'string') formDataToSend.append("image", formData.image , formData.image.name);
        const config = { url: `/profile/update`, method: "put", data: formDataToSend, headers: { Authorization: token }, params: { id: profile._id ,prevImgId: profile.image} };
        await fetchData(config).then((data) => {
            dispatch(merchantProfile(data.user))
        })
        .catch(error => {
                console.error('Error fetching merchant data:', error);
        });
    }

  return (
    <div className="col-8 p-3 mb-5">
    <center><h5 className="card-title my-2">Merchant Profile</h5></center>
   {loading? <PreLoader /> :<div className="row">
    <div className="col-xl-4 my-4">
            {/* <!-- Profile picture card--> */}
            <div className="card mb-1 mb-xl-0 bg-dark">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                    {/* <!-- Profile picture image--> */}
                    {!imageLoaded && <div className="loading-spinner"></div>}
                    <img 
                        className={`img-account rounded-circle mb-4 ${imageLoaded ? "" : "hidden"}`}
                        src={imageSrc}
                        alt=""
                        height="154.375rem"
                        width="154.375rem"
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(false)}
                    />
                    {/* <button class="btn btn-primary" type="button">Upload new image</button><label className="form-label fs-6 text-white" htmlFor="inputGroupFile01">Image</label> */}
                    <input type="file" className="form-control" name="image"  id="inputGroupFile01" accept='.jpeg, .png, .jpg' onChange={handleChange} />
                </div>
            </div>
        </div>
        <div className="col-xl-8">
            {/* <div class="card mb-4"> */}
                <div className="form-group">
                    <label htmlFor="name">First Name</label>
                    <input type="text" name='firstName'  id="fname" className="form-control" value={formData.firstName} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Last Name</label>
                    <input type="text" name='lastName' id="lname" className="form-control" value={formData.lastName} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input className="form-control" type="date" placeholder="Date Of birth"  name='dob' value={formData.dob} onChange={handleChange} />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="password">Change Password</label>
                    <input type="password" id="password" className="form-control" value="********"/>
                    <button>Change Password</button>
                </div> */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control" name="email" value={formData.email}  onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" id="phone" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="gender">Gender</label>
                    <select className='form-control form-select' name='gender' value={formData.gender} onChange={handleChange}>
                    <option className='text-dark'>Select Gender</option>
                    <option className='text-dark'>Male</option>
                    <option className='text-dark'>Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input type="text" id="company" className="form-control" name='companyName'  value={formData.companyName} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <input type="text" id="role" className="form-control" name="role" value={formData.role} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input id="address" className="form-control" name="address" value={formData.address} onChange={handleChange}/>
                </div>
                <center><button type="button" className="content-h2 text-white btn-lg" onClick={handleUpdate}>Save Changes</button></center>
            </div>
        {/* </div> */}
    </div>}
    </div>
  )
}

export default EditProfile
