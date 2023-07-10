import React, { useCallback, useEffect, useState } from "react";
import Footer from "../../components/gamer-components/Footer";
import Header from "../../components/gamer-components/Navbar";
import Card from "../../components/gamer-components/Card";
import TransactionHistory from "../../components/gamer-components/TransactionHistory";
import Recommended from "../../components/gamer-components/Recommended";
import PageComp from "../../components/gamer-components/PageComp";
import MyItems from "../../components/gamer-components/myItems";
import useFetch from "../../hooks/useFetch-gamer";

import { useDispatch } from "react-redux";
import { gamerProfile } from "../../redux/actions/gamerAction";
import FullpageLoader from "../../components/general-components/FullpageLoader";

export default function Home() {
  const [user, setUser] = useState();
  const [merchant, setMerchant] = useState([]);
  const [snaphistory, setSnaphistory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [pendingOrders,setPendingOrders]=useState(0)

  const token = localStorage.getItem("token");
  const [fetchData, { loading }] = useFetch();

  const dispatch = useDispatch();

  const fetchUser = useCallback(() => {
    const config = {
      url: "/profile",
      method: "get",
      headers: { Authorization: token },
    };
    fetchData(config, { showSuccessToast: false })
      .then((data) => {
        setUser(data.user);
        console.log("d is: ", data);
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
  const [totalMerchandises, setTotalMerchandises] = useState();
  const itemsPerPage = 3; // change the value here sasi

  const fetchMerchandise = useCallback(async () => {
    const config = {
      url: "/merchant/display",
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

  const pagelength = Math.ceil(totalMerchandises / itemsPerPage);
  console.log("TM: ", totalMerchandises);
  console.log("PL: ", pagelength);
  const start = 1;
  const end = pagelength;
  const pages = ["<<", "<"]; // represents  the starting page

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  pages.push(">"); // represents the ending page
  pages.push(">>");

  const handleClick = (e) => {
    e.preventDefault();
    var temppage = e.target.innerHTML;
    if (temppage === "&lt;") {
      setCurrentPage((prev) => {
        if (prev > 1) {
          return prev - 1;
        }
        return prev;
      });
    } else if (temppage === "&lt;&lt;") {
      setCurrentPage(1);
    } else if (temppage === "&gt;") {
      setCurrentPage((prev) => {
        if (prev < end) {
          return prev + 1;
        }
        return prev;
      });
    } else if (temppage === "&gt;&gt;") {
      setCurrentPage(pages[pages.length - 3]);
    } else {
      setCurrentPage(temppage);
    }
  };

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
      .then((data) => {
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

  const pagelength2 = Math.ceil(totalHistory / itemsPerPage2);
  console.log("TH: ", totalHistory);
  console.log("PL2: ", pagelength2);
  const start2 = 1;
  const end2 = pagelength2;
  const pages2 = ["<<", "<"]; // represents  the starting page

  for (let i = start2; i <= end2; i++) {
    pages2.push(i);
  }

  pages2.push(">"); // represents the ending page
  pages2.push(">>");

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

  const [currentPage1, setCurrentPage1] = useState(1);
  const [totaltransactions, setTotaltransactions] = useState();
  const itemsPerPage1 = 3; // change the value here sasi

  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  console.log(searchKeyword);

  //const [isSearchClicked, setIsSearchClicked] = useState(false);

  const fetchTransactions = useCallback(() => {
    const config = {
      url: `/transaction/displayItems?user_id=${user?._id}`,
      method: "get",
      headers: { Authorization: token },
      params: { pagenum: currentPage1, size: itemsPerPage1 }, // Use currentPage1 here instead of currentPage
    };

    return fetchData(config, { showSuccessToast: false })
      .then((data) => {
        setTotaltransactions(data.total_counts);
        // setTottransactions(data.total_trans)
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
          setPendingOrders(response.pendingOrders)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransData();
  }, [fetchTransactions]);

  //pagination implemented for transaction history
  const pagelength1 = Math.ceil(totaltransactions / itemsPerPage1);
  console.log("TT: ", totaltransactions);
  console.log("PL1: ", pagelength1);
  const start1 = 1;
  const end1 = pagelength1;
  const pages1 = ["<<", "<"]; // represents  the starting page

  for (let i = start1; i <= end1; i++) {
    pages1.push(i);
  }

  pages1.push(">"); // represents the ending page
  pages1.push(">>");

  console.log(pages1);

  const handleClick1 = (e) => {
    e.preventDefault();
    const temppage = e.target.innerHTML;

    if (temppage === "&lt;" || temppage === "<") {
      setCurrentPage1((prev) => {
        if (prev > 1) {
          return prev - 1;
        }
        return prev;
      });
    } else if (temppage === "&lt;&lt;" || temppage === "<<") {
      setCurrentPage1(1);
    } else if (temppage === "&gt;" || temppage === ">") {
      setCurrentPage1((prev) => {
        if (prev < end1) {
          return prev + 1;
        }
        return prev;
      });
    } else if (temppage === "&gt;&gt;" || temppage === ">>") {
      setCurrentPage1(end1);
    } else {
      // Check if it's a search page
      if (searchKeyword !== "") {
        // Calculate the page number based on the index of the clicked page
        const clickedPage = parseInt(temppage);
        const searchPage = Math.ceil(
          (clickedPage * itemsPerPage1) / itemsPerPage
        );
        setCurrentPage1(searchPage);
      } else {
        setCurrentPage1(parseInt(temppage));
      }
    }

    // Perform the search if a keyword is present
    if (searchKeyword !== "") {
      handleSearch();
    } else {
      fetchTransactions();
    }
  };

  // Update handleSearch to include the logic for regular page clicks
  const handleSearch = () => {
    const transactionConfig = {
      url: `/transaction/displayItems?user_id=${user?._id}`,
      method: "get",
      headers: { Authorization: token },
      params: {
        pagenum: currentPage1,
        size: itemsPerPage1,
        searchTerm: searchKeyword,
      },
    };

    fetchData(transactionConfig, { showSuccessToast: false })
      .then((transactionData) => {
        if (transactionData.transactions.length === 0) {
          // No transactions found for the searched keyword
          setTransactions([]);
          setTotaltransactions(0);
        } else {
          setTransactions(transactionData.transactions);
          setTotaltransactions(transactionData.total_counts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loading && <FullpageLoader />}
      <Header />

      <div className="banner">
        <img
          src="assets/img/hero_general.jpg"
          alt=""
          className="card-img-top w-100"
          style={{ height: "275px" }}
        />
      </div>

      <div class="container margin_30_40">
        <div class="row justify-content-center">
          <div class="col-lg-3 col-md-6">
            {user && (
              <Card
                gamerName={user.userName}
                walletMoney={user.walletMoney}
                memberSince={user.joiningTime}
                pending={pendingOrders}
              />
            )}
          </div>
          <div class="col-lg-9 ps-lg-5">
            <div class="tabs_detail">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a
                    id="tab-A"
                    href="#pane-A"
                    class="nav-link active"
                    data-bs-toggle="tab"
                    role="tab"
                  >
                    Recommended
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    id="tab-B"
                    href="#pane-B"
                    class="nav-link"
                    data-bs-toggle="tab"
                    role="tab"
                  >
                    Snapps Collected
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    id="tab-C"
                    href="#pane-C"
                    class="nav-link"
                    data-bs-toggle="tab"
                    role="tab"
                  >
                    Snapps Redeemed
                  </a>
                </li>
              </ul>
              <div class="tab-content" role="tablist">
                <div
                  id="pane-A"
                  class="card tab-pane fade show active"
                  role="tabpanel"
                >
                  <div class="card-header" role="tab" id="heading-A">
                    <h5>
                      <a
                        class="collapsed"
                        data-bs-toggle="collapse"
                        href="#collapse-A"
                      >
                        Recommended
                      </a>
                    </h5>
                  </div>
                  <div id="collapse-A" className="collapse" role="tabpanel">
                    <div className="row mt-lg-5 mt-3">
                      {merchant.map((product, index) => (
                        <div
                          className="col-xl-4 col-lg-6 col-md-6 col-sm-6"
                          key={index}
                        >
                          <div style={{ width: "100%" }}>
                            <Recommended
                              title={product.title}
                              img={product.image}
                              desc={product.description}
                              brand={product.brand}
                              price={product.price}
                              index={index}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <div className="pagination_fg mb-4">
                        {pages.map((i) => {
                          return (
                            <PageComp
                              key={i}
                              pagenum={i}
                              handleClick={handleClick}
                              isActive={currentPage === i ? true : false}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div id="pane-B" class="card tab-pane fade" role="tabpanel">
                  <div class="card-header" role="tab" id="heading-B">
                    <h5>
                      <a
                        class="collapsed"
                        data-bs-toggle="collapse"
                        href="#collapse-B"
                      >
                        Transaction History
                      </a>
                    </h5>
                  </div>
                  <div id="collapse-B" class="collapse" role="tabpanel">
                    <div class="row mt-lg-5 mt-3">
                      <aside class="col-lg-12">
                        <div class="widget search_blog">
                        <div class="form-group d-flex">
                            <input
                              class="form-control me-2 w-100 bg-white text-dark"
                              type="search"
                              placeholder="Search here..."
                              aria-label="Search"
                              value={searchKeyword}
                              onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <button
                              class="btn text-white bg-danger inside"
                              onClick={handleSearch}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                        <div class="widget">
                          {transactions.length > 0 ? (
                            <div className="row history_list">
                            {snaphistory.map((transaction, index) => (
                              <div
                                className="col-xl-4 col-lg-6 col-md-6 col-sm-12"
                                key={index}
                              >
                                <MyItems
                                  tdate={transaction.transactionDate}
                                  tId={transaction.transactionId}
                                  status={transaction.orderStatus}
                                />
                              </div>
                            ))}
                          </div>
                          ) : (
                            <center><h3>No Snaps Collected</h3></center> 
                          )}
                        </div>
                       
                        <div className="text-center">
                          <div className="pagination_fg mb-4">
                            {pages2.map((i) => {
                              return (
                                <PageComp
                                  key={i}
                                  pagenum={i}
                                  handleClick={handleClick2}
                                  isActive={currentPage === i ? true : false}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </aside>
                    </div>
                  </div>
                </div>

                <div id="pane-C" class="card tab-pane fade" role="tabpanel">
                  <div class="card-header" role="tab" id="heading-C">
                    <h5>
                      <a
                        class="collapsed"
                        data-bs-toggle="collapse"
                        href="#collapse-C"
                      >
                        Transaction History
                      </a>
                    </h5>
                  </div>
                  <div id="collapse-C" class="collapse" role="tabpanel">
                    <div class="row mt-lg-5 mt-3">
                      <aside class="col-lg-12">
                        <div class="widget search_blog">
                          <div class="form-group d-flex">
                            <input
                              class="form-control me-2 w-100 bg-white text-dark"
                              type="search"
                              placeholder="Search here..."
                              aria-label="Search"
                              value={searchKeyword}
                              onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <button
                              class="btn text-white bg-danger inside"
                              onClick={handleSearch}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                        <div class="widget">
                          {transactions.length > 0 ? (
                            <div>
                              {transactions.map((transaction, index) => (
                                <TransactionHistory
                                  key={index}
                                  tdate={transaction.transactionDate}
                                  tId={transaction.transactionId}
                                  status={transaction.orderStatus}
                                />
                              ))}
                            </div>
                          ) : (
                            <center><h3>No Snaps Redeemed</h3></center> 
                          )}
                        </div>
                        <div class="text-center">
                          <div class="pagination_fg mb-4">
                            {pages1.map((i) => {
                              return (
                                <PageComp
                                  key={i}
                                  pagenum={i}
                                  handleClick={handleClick1}
                                  isActive={currentPage === i ? true : false}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </aside>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}