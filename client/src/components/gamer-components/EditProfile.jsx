import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch-gamer';
import { gamerProfile } from '../../redux/actions/gamerAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import PreLoader from './utils/PreLoader'


const EditProfile = () => {
  const gaming = useSelector(state => state.gamerReducer);
  const profile = gaming.gamer;

  

  const [fetchData,{loading}] = useFetch();
  const dispatch = useDispatch();
   
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
      setImageSrc(
        profile.image
          ? `${process.env.REACT_APP_URL}/api/profile/img/${profile.image}`
          : "https://distil.in/demo/snappcoins/img/avatar-user.jpg"
      );
  }, [profile.image]);
  


  console.log("profile: ", profile)

  const initialFormData = {
    userName: profile ? profile.userName : '',
    email: profile ? profile.email : '',
    image: profile ? profile.image : '',
  };

  console.log("initialfdata: ", initialFormData)

  const [formData, setFormData] = useState(initialFormData);

  //console.log(typeof (formData.image))
  console.log("form data is: ", formData)

  

  const handleChange = async (e) => {
    if (e.target.name === "image") {
      if (e.target.files.length > 0) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.files[0],
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  

  useEffect(() => {
    if (profile) {
      setFormData({
        userName: profile.userName,
        email: profile.email,
        image: profile.image,
      });
    }
  }, [profile,setFormData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const updatedFormData = new FormData();
  
    updatedFormData.append('userName', formData.userName);
    updatedFormData.append('email', formData.email);
  
    if (formData.image instanceof File) {
      updatedFormData.append('image', formData.image, formData.image.name);
    }
  
    const params = {
      id: profile ? profile._id : '',
      prevImgId: profile ? profile.image : '',
    };
  
    const config = {
      url: '/profile/update',
      method: 'put',
      data: updatedFormData,
      headers: { Authorization: token },
      params: params,
    };
  
    try {
      const data = await fetchData(config);
      console.log('Response from API:', data);
      dispatch(gamerProfile(data.user));
    } catch (error) {
      console.error('Error fetching Gamer data:', error);
    }
  };
  
  

  return (

    
    <div className='edit-profile'>

    {loading ? <PreLoader /> :
        <div className="col-6 shadow p-3 mb-5 bg-black rounded " style={{ width: '45rem' ,marginLeft:'19rem',marginTop:'-10rem' }}>
          <center>
            <h5 className="card-title text-muted">Gamer Profile</h5>
          </center>
          
                {/* <!-- Profile picture card--> */}
              
                <div className="card-body text-center" style={{ textAlign: 'left', marginLeft: '1rem', marginBottom: '1rem', position: 'relative' }}>
          {!imageLoaded && <div className="loading-spinner"></div>}
          <img
            className={`img-account rounded-circle mb-4 ${imageLoaded ? '' : 'hidden'}`}
            src={imageSrc}
            alt=""
            height="154.375rem"
            width="154.375rem"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
          <label htmlFor="inputGroupFile01" className="camera-icon" style={{ position: 'absolute', bottom: "16%", right: "42%" }}>
            <FontAwesomeIcon icon={faCamera} style={{  cursor: 'pointer' }} />
          </label>
          <input
            type="file"
            className="form-control hidden-input"
            name="image"
            id="inputGroupFile01"
            accept=".jpeg, .png, .jpg"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </div>

              
              <div className="form-group text-center" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="name" style={{ textAlign: 'center',color:"gray", marginLeft: '-5.4rem', marginBottom: '1rem' }}>
                  User Name
                </label>
                
                <div className="d-inline-block">
                  <input type="text" style={{borderColor: 'lightgray',width:"349px" }}name="userName" id="fname" className="form-control " value={formData.userName} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group text-center" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="password" style={{ textAlign:"center",color:"gray", marginLeft: '-5rem', marginBottom: '1rem' }}>
                  Password
                </label>
                
                <div className="d-inline-block">
                  <input type="text"style={{borderColor: 'lightgray',width:"350px" }} name="password" id="fname" className="form-control " value={formData.password} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group text-center" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="email" style={{ textAlign: 'center',color:"gray", marginLeft: '-3.8rem', marginBottom: '1rem' }}>
                  Email
                </label>
                
                <div className="d-inline-block" >
                  <input type="text" style={{borderColor: 'lightgray', width:"350px"}} name="email" id="fname" className="form-control" value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <center>
                <button type="button" className="content-h2 text-white btn-lg" onClick={handleUpdate}   onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}  style={{ margin: '0 10px', backgroundColor: isHovered? '#3dbf8c' : '#ff0071',transition: 'background-color 0.3s ease',}}>
                  Save Changes
                </button>
              </center>
        </div>
    }
        </div>
      );
    };

    export default EditProfile;