/*import React, { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DetailsPage() {

  const location = useLocation();
  const { displayData, imageSrc } = location.state;

  console.log("pd: ",displayData);
  console.log("i:",imageSrc);

  const [isExtended, setIsExtended] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleReadMore = (e) => {
    e.preventDefault();
    setIsExtended(true);
  };

  const handleReadLess = (e) => {
    e.preventDefault();
    setIsExtended(false);
  };
  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };


  const cardStyle = isExtended
    ? { height: "65rem", width: "53rem", marginTop: "4rem", marginLeft: "7rem" }
    : {
        height: "75rem",
        width: "53rem",
        marginTop: "4rem",
        marginLeft: "7rem",
      };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Navbar darkMode={darkMode} onDarkModeToggle={handleDarkModeToggle}/>
      <div className="page-container">
        <div className="box">
          <div className="shadow p-5" style={cardStyle}>
            <img
              src={imageSrc}
              alt=""
              style={{
                height: "37rem",
                width: "48rem",
                marginTop: "-2%",
                marginLeft: "0.5rem",
                marginBottom: "2rem"
              }}
            />

            <div
              className="clearfix mb-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="item_desc" style={{ flex: "1" }}>
                <div className="mb-3">
                  <a href="author.html" className="author">
                    <div className="author_thumb veryfied">
                      <i className="bi bi-check"></i>
                      <figure>
                        <img
                          src="https://distil.in/demo/snappcoins/img/avatar1.jpg"
                          data-src="img/avatar1.jpg"
                          alt=""
                          className="lazy loaded"
                          width="100"
                          height="100"
                          data-was-processed="true"
                        />
                      </figure>
                    </div>
                    <h6 className="ms-1" style={{color:"black"}}>
                      <span style={{color:"black"}}>Brand</span>{displayData.brand}
                    </h6>
                  </a>
                </div>
              </div>
              <div className="score_in">
                123 Likes{" "}
                <a href="#0" className="wish_bt">
                  <i className="bi bi-heart"></i>
                </a>
              </div>
            </div>

            <h3 style={{ color: "#333" }}>{displayData.brand} | {displayData.title}</h3>
            <p style={{ color: "#666" }}>
              {displayData.desc}
              {isExtended ? (
                <span>
                  <br />
                  <br />
                  <span style={{ color: "#777" }}>
                    
                  </span>
                  <br />
                  <br />
                  <a href="#" onClick={handleReadLess} style={{ color: darkMode ? "lime" : "#48E0A4" }}>
                    Read Less
                  </a>
                </span>
              ) : (
                <a href="#" onClick={handleReadMore} style={{ color: darkMode ? "lime" : "#48E0A4" }}>
                  <br />
                  <br />
                  <span>Read More</span>
                </a>
              )}
            </p>
          </div>
            <div className="additional">
              <h6>Additional Info</h6>

              <div className="separatorline"></div>
              <ul className="list-items">
                <li>Size</li>
                <li>Format</li>
                <li>TokenID</li>
              </ul>
            </div>
          

          <div className="col-xl-4 col-lg-5" id="sidebar_fixed">
          <div className="col-xl-4 col-lg-5" id="sidebar_fixed">
  <div className="sidebar">
    <div className="sidebar-box">
      <div className="theiaStickySidebar">
        {/* Sidebar content goes here */

        /*
        <div className="box_bid text-center" style={{ alignItems: "center" }}>
          <h3 style={{ color: "black" }}>{displayData.title}</h3>
          <a href="#0" className="close_panel_mobile">
            <i className="icon_close"></i>
          </a>
          <div className="item_meta text-center">
            <h3
              style={{
                color: "black",
                fontSize: "1rem",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              Redeem With <br />
              <strong style={{ fontSize: "3rem" }}> {displayData.price}  snapps</strong>
            </h3>
            <p className="countdown_in">
              Ends in
              <br />
              <strong
                data-countdown="2022/03/15"
                style={{ fontSize: "2rem" }}
              >
                00D 00:00:00
              </strong>
            </p>
          </div>
          <hr />
          <a
            href="#modal-dialog"
            className="btn_1 full-width mb-2 modal_popup"
          >
            Snapp Now!
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

           
<ul className="share-buttons" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', listStyle: 'none', padding: 0,marginTop:"-50%",marginRight:"-275%"}}>
  <div className="share-button-box" style={{ marginRight: '0.5rem', backgroundColor: 'white'}}>
    <li>
      <a href="#0" style={{ textDecoration: 'none', color: '#333', fontSize: '1.2rem' }}>
        <i className="bi bi-instagram"></i>
      </a>
    </li>
  </div>
  <div className="share-button-box" style={{ backgroundColor: 'white',marginRight: '0.5rem'}}>
    <li>
      <a href="#0" style={{ textDecoration: 'none', color: '#333', fontSize: '1.2rem' }}>
        <i className="bi bi-facebook"></i>
      </a>
    </li>
  </div>
  <div className="share-button-box" style={{ marginRight: '0.5rem', backgroundColor: 'white'}}>
    <li>
      <a href="#0" style={{ textDecoration: 'none', color: '#333', fontSize: '1.2rem' }}>
        <i className="bi bi-twitter"></i>
      </a>
    </li>
  </div>
  <div className="share-button-box" style={{ marginRight: '0.5rem', backgroundColor: 'white' }}>
    <li>
      <a href="#0" style={{ textDecoration: 'none', color: '#333', fontSize: '1.2rem' }}>
        <i className="bi bi-youtube"></i>
      </a>
    </li>
  </div>
</ul>
 </div>
        </div>
      </div>
      <div style={{ marginBottom: "5rem" }}></div>
      <Footer />
     
    </div>
  );
}
*/

import React, { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function DetailsPage() {

  const location = useLocation();
  const { displayData, imageSrc } = location.state;

  console.log("pd: ",displayData);
  console.log("i:",imageSrc);

  const [isExtended, setIsExtended] = useState(false);
  

  const handleReadMore = (e) => {
    e.preventDefault();
    setIsExtended(true);
  };

  const handleReadLess = (e) => {
    e.preventDefault();
    setIsExtended(false);
  };
  return (
    <div>
      <Navbar />
      <main style={{"transform": "none"}}>
	    <div class="container" style={{"transform": "none"}}>
	        <div class="row" style={{"transform": "none"}}>
	            <div class="col-xl-8 col-lg-7 margin_detail" style={{"zIndex":2,"position":"relative","margin-right": "400px"}}>
                  <div class="box_general" style={{alignContent:"center"}}>
                    <img src={imageSrc} alt="" class="img-fluid"/>
                    <div class="main_info_wrapper">
                      <div class="main_info">
                          <div class="clearfix mb-3">
                              <div class="item_desc">
                                  <div class="mb-3">
                                      <a href="author.html" class="author">
                                          <div class="author_thumb veryfied"><i class="bi bi-check"></i>
                                              <figure>
                                                  <img src="avatar1.jpg" data-src="img/avatar1.jpg" alt="" class="lazy loaded" width="100" height="100" data-was-processed="true" /></figure>
                                          </div>
                                          <h6 class="ms-1"><span>Brand</span>{displayData.brand}</h6>
                                      </a>
                                  </div>
                              </div>
                              <div class="score_in">
                                  123 Likes <a href="#0" class="wish_bt"><i class="bi bi-heart"></i></a>
                              </div>
                          </div>
                          <h1 class="mb-md-2">{displayData.brand} | {displayData.title}</h1>
                          <p style={{ color: "#666" }}>
              {displayData.desc}
              {isExtended ? (
                <span>
                  <br />
                  <br />
                  <span style={{ color: "#777" }}>
                    
                  </span>
                  <br />
                  <br />
                  <a href="#" onClick={handleReadLess} >
                    Read Less
                  </a>
                </span>
              ) : (
                <a href="#" onClick={handleReadMore} >
                  <br />
                  <br />
                  <span>Read More</span>
                </a>
              )}
            </p>
                      </div>
                  </div>
                  
                  </div>
	                <div class="tabs_detail">
	                    <ul class="nav nav-tabs" role="tablist">
	                     
	                        <li class="nav-item">
	                            <a id="tab-C" href="#pane-C" class="nav-link" data-bs-toggle="tab" role="tab">Additional Info</a>
	                        </li>
	                    </ul>
	                    <div class="tab-content" role="tablist">
	                        <div id="pane-A" class="card tab-pane fade show active" role="tabpanel" aria-labelledby="tab-A">
	                         
	                            <div id="collapse-A" class="collapse" role="tabpanel" aria-labelledby="heading-A">
	                                  <div class="pt-4">
	                                    <div class="row">
	                                        <div class="col-lg-6">
	                                            <ul class="bullets">
	                                                <li>Size <span>3000x2000px</span></li>
	                                                <li>Format <span>Tiff, Jpeg, Gif, Pdf</span></li>
	                                                <li>Token ID <span>002334</span></li>
	                                                
	                                            </ul>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                       
	                        <div id="pane-C" class="card tab-pane fade" role="tabpanel" aria-labelledby="tab-C">
	                            <div class="card-header" role="tab" id="heading-C">
	                                <h5>
	                                    <a class="collapsed" data-bs-toggle="collapse" href="#collapse-C">
	                                        Additional Info
	                                    </a>
	                                </h5>
	                            </div>
	                            <div id="collapse-C" class="collapse" role="tabpanel" aria-labelledby="heading-C">
	                                <div class="pt-4">
	                                    <div class="row">
	                                        <div class="col-lg-6">
	                                            <ul class="bullets">
	                                                <li>Size <span>3000x2000px</span></li>
	                                                <li>Format <span>Tiff, Jpeg, Gif, Pdf</span></li>
	                                                <li>Token ID <span>002334</span></li>
	                                                
	                                            </ul>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        
	                    </div>
	                   
	                </div>     
	            </div>
	            
	            <div class="col-xl-4 col-lg-5 sticky-sidebar" id="sidebar_fixed" style={{"box-sizing": "border-box", "min-height": "1px","position":"relative","zIndex":2,"margin-left": "-00px"}}>   
	                
	            <div class="theiaStickySidebar" style={{"padding-top": "0px", "padding-bottom": "1px", "position": "fixed", "transform": "translateY(135px)", "left": "1000.2px", "top": "0px", "width": "376px" }}>
                <div class="box_bid">
	                    <h2>{displayData.title}</h2>
	                    <a href="#0" class="close_panel_mobile"><i class="icon_close"></i></a>
	                    <div class="item_meta"> <h3>Redeem With<br/> <strong>{displayData.price}  snapps</strong></h3>
	                        <p class="countdown_in">Ends in<br /><strong data-countdown="2022/03/15">00D 00:00:00</strong></p>
	                    </div>
	                    <hr /> <a href="#modal-dialog" class="btn_1 full-width mb-2 modal_popup">Snapp Now!</a> 
	                </div><ul class="share-buttons">
	                    <li><a href="#0"><i class="bi bi-instagram"></i></a></li>
	                    <li><a href="#0"><i class="bi bi-facebook"></i></a></li>
	                    <li><a href="#0"><i class="bi bi-twitter"></i></a></li>
	                    <li><a href="#0"><i class="bi bi-youtube"></i></a></li>
	                </ul><div class="resize-sensor" style={{"position": "absolute" ,"inset": "0px", "overflow": "hidden", "z-index": "-1", "visibility": "hidden"}}><div class="resize-sensor-expand" style={{"position": "absolute", "left": 0, "top": 0, "right": 0, "bottom": 0, "overflow": "hidden", "z-index": -1, "visibility": "hidden"}}><div style={{"position": "absolute", "left": "0px" ,"top": "0px", "transition": "all 0s ease 0s", "width": "386px" ,"height": "485px"}}></div></div><div class="resize-sensor-shrink" style={{"position": "absolute", "left": 0, "top": 0, "right": 0, "bottom": 0, "overflow": "hidden", "z-index": -1, "visibility": "hidden"}}>
                  <div style={{ position: 'absolute', left: 0, top: 0, transition: '0s', width: '200%', height: '200%' }}></div>
                     </div>
                     </div></div>
              </div>
	            
	        </div>
	        
	    </div>
	    
	</main>
      <Footer />
     
    </div>
  );
}