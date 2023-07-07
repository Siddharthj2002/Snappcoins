import React, { useCallback, useEffect, useState } from 'react';
import Footer from '../../components/gamer-components/Footer';
import Navbar from '../../components/gamer-components/Navbar';
import Card from '../../components/gamer-components/Card';
import TransactionHistory from '../../components/gamer-components/TransactionHistory';
import Recommended from '../../components/gamer-components/Recommended';
import PageComp from '../../components/gamer-components/PageComp';
import MyItems from '../../components/gamer-components/myItems';
import useFetch from '../../hooks/useFetch-gamer';
import gamer_style from "../../styles/gamer-home.css";
import { useDispatch } from 'react-redux';
import { gamerProfile } from '../../redux/actions/gamerAction';
import PreLoader from '../../components/gamer-components/utils/PreLoader';
import Loader from '../../components/gamer-components/utils/Loader';

export default function Home() {


  const [activeContent, setActiveContent] = useState('recommendations');
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState();
  const [transactions, setTransactions] = useState([]);
  const [snaphistory,setSnaphistory] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [merchant, setMerchant] = useState([]);
  
  const [inTransitCount, setInTransitCount] = useState(0);

  const [tottransactions,setTottransactions] = useState([]);

  

  const token = localStorage.getItem('token');
  const [fetchData ,{loading}] = useFetch();

  const dispatch = useDispatch();

  const fetchUser = useCallback(() => {
    const config = { url: "/profile", method: "get", headers: { Authorization: token } };
    fetchData(config, { showSuccessToast: false })
      .then(data => {
        setUser(data.user);
        console.log("d is: ",data)
        dispatch(gamerProfile(data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token, dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);


  //RECOMMENDATION SECTION
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMerchandises,setTotalMerchandises]=useState();
	const itemsPerPage = 3; // change the value here sasi

  const fetchMerchandise = useCallback(async () => {
    const config = {
      url: '/merchant/display',
      method: "get",
      headers: { Authorization: token },
      params: { pagenum: currentPage, size: itemsPerPage },
    };
  
    try {
      const response = await fetchData(config, { showSuccessToast: false });
      setMerchant(response.merchant);
      return response; // Return the response object for further processing
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to be caught in the calling function
    }
  }, [fetchData, token, currentPage, itemsPerPage]);
  
  useEffect(() => {
    const fetchMerchandiseData = async () => {
      try {
        const response = await fetchMerchandise();
        setTotalMerchandises(response.total_count);
        setMerchant(response.merchant);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchMerchandiseData();
  }, [fetchMerchandise]);


   //pagination implemented for Recommendatons section

   const pagelength = Math.ceil(totalMerchandises/ itemsPerPage);
   console.log("TM: ",totalMerchandises)
   console.log("PL: ",pagelength);
   const start = 1;
   const end = pagelength;
   const pages = ["<<", "<"]; // represents  the starting page
 
   for (let i = start; i <= end; i++) {
     pages.push(i);
   
   }
 
   pages.push(">") // represents the ending page
   pages.push(">>")
 
   const handleClick = (e) => {
     e.preventDefault();
     var temppage = e.target.innerHTML
     if (temppage === "&lt;") {
       setCurrentPage((prev) => {
         if (prev > 1) {
           return prev - 1
         }
         return prev
       })
     }
     else if (temppage === "&lt;&lt;") {
       setCurrentPage(1)
     }
     else if (temppage === "&gt;") {
       setCurrentPage((prev) => {
         if (prev < end) {
           return prev + 1
         }
         return prev
       })
     }
     else if (temppage === "&gt;&gt;") {
       setCurrentPage(pages[pages.length - 3])
     }
     else {
       setCurrentPage(temppage)
     }
 
   }
 //---------------------------------------------------------------------------------------------------//
 //TRANSACTION HISTORY SECTION
  
const [currentPage1, setCurrentPage1] = useState(1);
const [totaltransactions, setTotaltransactions] = useState();
const itemsPerPage1 = 3; // change the value here sasi

//const [searchKeyword, setSearchKeyword] = useState('');


const fetchTransactions = useCallback(() => {
  const config = {
    url: `/transaction/displayItems?user_id=${user?._id}`,
    method: "get",
    headers: { Authorization: token },
    params: { pagenum: currentPage1, size: itemsPerPage1 }, // Use currentPage1 here instead of currentPage
  };

  return fetchData(config, { showSuccessToast: false })
    .then(data => {
      setTotaltransactions(data.total_counts);
      setTottransactions(data.total_trans)
      return data;
    })
    .catch((err) => {

      console.log(err);
    });
}, [fetchData, token, user, currentPage1, itemsPerPage1]);

useEffect(() => {
  const fetchTransData = async () => {
    try {
      const response = await fetchTransactions();
      if (response) {
        setTransactions(response.transactions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchTransData();
}, [fetchTransactions]);


    //pagination implemented for transaction history
    const pagelength1 = Math.ceil(totaltransactions/ itemsPerPage1);
    console.log("TT: ",totaltransactions)
    console.log("PL1: ",pagelength1);
    const start1 = 1;
    const end1 = pagelength1;
    const pages1 = ["<<", "<"]; // represents  the starting page
  
    for (let i = start1; i <= end1; i++) {
      pages1.push(i);
    
    }
  
    pages1.push(">") // represents the ending page
    pages1.push(">>")

    console.log(pages1);
  
    const handleClick1 = (e) => {
      e.preventDefault();
      var temppage = e.target.innerHTML;
      if (temppage === "&lt;") {
        setCurrentPage1((prev) => {
          if (prev > 1) {
            return prev - 1;
          }
          return prev;
        });
      } else if (temppage === "&lt;&lt;") {
        setCurrentPage1(1);
      } else if (temppage === "&gt;") {
        setCurrentPage1((prev) => {
          if (prev < end1) {
            return prev + 1;
          }
          return prev;
        });
      } else if (temppage === "&gt;&gt;") {
        setCurrentPage1(end1);
      } else {
        setCurrentPage1(parseInt(temppage));
      }
    };
    
  //----------------------------------------------------------------------------------------------------//
  //SNAP HISTORY SECTION
 
  const [currentPage2, setCurrentPage2] = useState(1);
  const [totalHistory, setTotalHistory] = useState();
  const itemsPerPage2 = 6;

  const fetchhistory = useCallback(() => {
    const config = {
      url: `/transaction/displayItems?user_id=${user?._id}`,
      method: "get",
      headers: { Authorization: token },
      params: { pagenum: currentPage2, size: itemsPerPage2 }, // Use currentPage1 here instead of currentPage
    };
  
    return fetchData(config, { showSuccessToast: false })
      .then(data => {
        setTotalHistory(data.total_counts);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token, user, currentPage2, itemsPerPage2]);
  
  useEffect(() => {
    const fetchTransDatas = async () => {
      try {
        const response = await fetchhistory();
        if (response) {
          setSnaphistory(response.transactions);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchTransDatas();
  }, [fetchhistory]);


  const pagelength2 = Math.ceil(totalHistory/ itemsPerPage2);
    console.log("TH: ",totalHistory)
    console.log("PL2: ",pagelength2);
    const start2 = 1;
    const end2 = pagelength2;
    const pages2 = ["<<", "<"]; // represents  the starting page
  
    for (let i = start2; i <= end2; i++) {
      pages2.push(i);
    
    }
  
    pages2.push(">") // represents the ending page
    pages2.push(">>")

    console.log(pages2);
  
    const handleClick2 = (e) => {
      e.preventDefault();
      var temppage = e.target.innerHTML;
      if (temppage === "&lt;") {
        setCurrentPage2((prev) => {
          if (prev > 1) {
            return prev - 1;
          }
          return prev;
        });
      } else if (temppage === "&lt;&lt;") {
        setCurrentPage2(1);
      } else if (temppage === "&gt;") {
        setCurrentPage2((prev) => {
          if (prev < end2) {
            return prev + 1;
          }
          return prev;
        });
      } else if (temppage === "&gt;&gt;") {
        setCurrentPage2(end2);
      } else {
        setCurrentPage2(parseInt(temppage));
      }
    };
    
  //PAGINATIONS DONE
  //------------------------------------------------------------------------------------------------------//

  //pending orders

  useEffect(() => {
    const count = tottransactions.filter(transaction => transaction.orderStatus === 'In Transit').length;
    setInTransitCount(count);
  }, [tottransactions]);

  //-------------------------------------------------------------------------------------------------------//

  const handleRecommendationsClick = () => {
    setActiveContent('recommendations');
  };

  const handleTransactionHistoryClick = () => {
    setActiveContent('transactionHistory');
  };

  const handlesnapHistoryClick = () => {
    setActiveContent('snaphistory');
  };
  

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };


   
  return (

    
  
  <div className={`home ${darkMode ? 'dark-mode' : ''}`}>
  
  

    <>

      <Navbar
        darkMode={darkMode}
        onDarkModeToggle={handleDarkModeToggle}
      />

      <div className="banner">
        <img
          src="https://distil.in/demo/snappcoins/img/hero_general.jpg"
          alt=""
          className="card-img-top w-100"
          style={{ height: "275px" }}
        />
      </div>

      <div className="container-fluid py-5 px-5 mx-5 ">
          <div className="row">
            {user && (
              <div className="col-md-3 col-xl-3">
                <Card
                  gamerName={user.userName}
                  walletMoney={user.walletMoney}
                  memberSince={user.joiningTime}
                  inTransitCount={inTransitCount}
                />
              </div>
            )}
            {/* default loader should be added */}
            {loading ? <PreLoader /> :<div className="col-md-9 col-xl-9">
              <div className="content mt-4">
                <div role="group" aria-label="Content Navigation">
                  <button
                    className={`btn btn-link text-gray font-size-lg ${
                      activeContent === "recommendations" ? "active" : ""
                    }`}
                    onClick={handleRecommendationsClick}
                    style={{
                      border: "none",
                      textDecoration: "none",
                      boxShadow: "none",
                      position: "relative",
                    }}
                  >
                    Recommended
                    {activeContent === "recommendations" && (
                      <span
                        className="active-line"
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "2px",
                          backgroundColor: darkMode ? "white" : "black",
                        }}
                      />
                    )}
                  </button>
                  <button
                    className={`btn btn-link text-gray font-size-lg ${
                      activeContent === "transactionHistory" ? "active" : ""
                    }`}
                    onClick={handleTransactionHistoryClick}
                    style={{
                      border: "none",
                      textDecoration: "none",
                      boxShadow: "none",
                      position: "relative",
                    }}
                  >
                    Transaction History
                    {activeContent === "transactionHistory" && (
                      <span
                        className="active-line"
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "2px",
                          backgroundColor: darkMode ? "white" : "black",
                        }}
                      />
                    )}
                  </button>
                  <button
                    className={`btn btn-link text-gray font-size-lg ${
                      activeContent === "snaphistory" ? "active" : ""
                    }`}
                    onClick={handlesnapHistoryClick}
                    style={{
                      border: "none",
                      textDecoration: "none",
                      boxShadow: "none",
                      position: "relative",
                    }}
                  >
                    Snap History
                    {activeContent === "snaphistory" && (
                      <span
                        className="active-line"
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "2px",
                          backgroundColor: darkMode ? "white" : "black",
                        }}
                      />
                    )}
                  </button>
                  <div className="separator-container"></div>
                  <div className="separator"></div>
                </div>

                  <div className="mt-4">
                  {activeContent === "recommendations" && (
                    <div className="row">
                      {merchant.map((product, index) => (
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12" key={index}>
                          <Recommended
                            title={product.title}
                            img={product.image}
                            desc={product.description}
                            brand={product.brand}
                            price={product.price}
                            index={index}
                          />
                        </div>
                      ))}

                    <div className='text-center'>
                      <div className="pagination_fg mb-4">
                        {pages.map((i) => {
                          return <PageComp key={i} pagenum={i} handleClick={handleClick} isActive={currentPage === i ? true : false} />
                        })}
                      </div>
                    </div>
                    </div>
                  )}

              {activeContent === "transactionHistory" && transactions.length > 0 ? (
                <>
                  <div className="d-flex justify-content-center mb-4 col-9">
                    <input
                      className="form-control me-2 w-100 bg-white text-dark"
                      type="search"
                      placeholder="Search here..."
                      aria-label="Search"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button className="btn text-white bg-danger inside">Search</button>
                  </div>

                  {transactions
                    .filter((transaction) => {
                      if (searchKeyword === '') return true;
                      return transaction.orderStatus.toLowerCase().includes(searchKeyword.toLowerCase());
                    })
                    .map((transaction, index) => (
                      <TransactionHistory
                        key={index}
                        tdate={transaction.transactionDate}
                        tId={transaction.transactionId}
                        status={transaction.orderStatus}
                      />
                    ))}

                  <div className='text-center'>
                    <div className="pagination_fg mb-4" >
                      {pages1.map((i) => {
                        return <PageComp key={i} pagenum={i} handleClick={handleClick1} isActive={currentPage === i ? true : false} />
                      })}
                    </div>
                  </div>
                </>
              ) : <></>}


              {activeContent === "snaphistory" && snaphistory.length > 0 ? (
                <>
                  <div className="d-flex justify-content-center mb-4 col-9">
                    <input
                      className="form-control me-2 w-100 bg-white text-dark"
                      type="search"
                      placeholder="Search here..."
                      aria-label="Search"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button className="btn text-white bg-danger inside">Search</button>
                  </div>
                  <div className="row">
                    {snaphistory
                      .filter((transaction) => {
                        if (searchKeyword === '') return true;
                        return transaction.orderStatus.toLowerCase().includes(searchKeyword.toLowerCase());
                      })
                      .map((transaction, index) => (
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12" key={index}>
                          <MyItems
                            tdate={transaction.transactionDate}
                            tId={transaction.transactionId}
                            status={transaction.orderStatus}
                          />
                        </div>
                      ))}
                  </div>
                  <div className='text-center'>
                    <div className="pagination_fg mb-4">
                      {pages2.map((i) => {
                        return <PageComp key={i} pagenum={i} handleClick={handleClick2} isActive={currentPage === i ? true : false} />
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <p></p>
              )}
              
                </div>
              </div>
            </div>}
          </div>
      </div>


      <Footer darkMode={darkMode} />

    </>
  
  </div>

  
        
  
  );
        
}