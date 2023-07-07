import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "../../components/general-components/Product";
import axios from "axios";
import Pagination from "../../components/general-components/Pagination";
import Header from "../../components/general-components/Header";
import Filter from "../../components/general-components/Filter";
import PageComp from "../../components/general-components/PageComp";
import FilterUp from "../../components/general-components/FilterUp";

const Catalog = (props) => {
  const [products, setProducts] = useState(new Set());
  const [total_count, setCount] = useState(0);
  const [search_count, setSearchCount] = useState(0);
  const [genre, setgenre] = useState([]);
  //pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // change the value here sasi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_prod = await axios.get(
          "http://localhost:3001/api/merchandise/getall",
          {
            params: {
              pagenum: currentPage,
              size: itemsPerPage,
              searchTerm: searchTerm,
              category: Array.from(genre),
            },
          }
        );
        //const total = response_prod.headers.get("x-total-count");
        setProducts(response_prod.data.merchandises);
        setCount(response_prod.data.total_count);
        setSearchCount(response_prod.data.search_count);
        console.log(genre);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, total_count, searchTerm, search_count, genre]);

  // pagination logic
  const pagelength = Math.ceil(search_count / itemsPerPage);
  const start = 1;
  const end = pagelength;
  const pages = ["<<", "<"]; // represents  the starting page

  for (var i = start; i <= end; i++) {
    pages.push(i);
  }

  pages.push(">"); // represents the ending page
  pages.push(">>");

  const Category = ["Art", "Electronics", "Stationary", "Music", "Wellness"];
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

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  //search functionality

  return (
    <>
      <Header />
      <main>
        <FilterUp>
          <div className="search_bar_list">
            <input
              type="text"
              className="form-control"
              placeholder="Search again..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </FilterUp>

        <div className="container margin_30_40">
          <div className="page_header">
            <div className="breadcrumbs">
              <ul>
                <li>
                  <Link to="#">Home</Link>
                </li>
                <li>
                  <Link to="#">Category</Link>
                </li>
                <li>Page active</li>
              </ul>
            </div>
            <h1>All :</h1>
            <span> {search_count} found</span>
          </div>

          <div className="row">
            <Filter>
              {Category.map((g) => {
                return (
                  <li>
                    <label className="container_check">
                      {g}
                      {/* <small>100</small> */}
                      <input
                        type="checkbox"
                        value={g}
                        onChange={(e) => {
                          setgenre((prev) => {
                            if (e.target.checked) {
                              const temp = new Set(genre);
                              temp.add(e.target.value);
                              return temp;
                            } else {
                              const temp = new Set(genre);
                              temp.delete(e.target.value);
                              return temp;
                            }
                          });
                        }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </li>
                );
              })}
            </Filter>

            <div className="col-lg-9">
              <div className="row">
                {search_count !== 0 ? (
                  products.map((product) => (
                    <Product
                      price={product.price}
                      desc={product.description}
                      brand={product.brand}
                      title={product.title}
                      count={product.count}
                      img={product.image}
                      userid={product.userid}
                    />
                  ))
                ) : (
                  <p className="text-center">No products Available</p>
                )}
              </div>
              <div className="text-center">
                <div className="pagination_fg mb-4">
                  {search_count !== 0
                    ? pages.map((i) => {
                        return (
                          <PageComp
                            key={i}
                            pagenum={i}
                            handleClick={handleClick}
                            isActive={currentPage == i ? true : false}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <h3>Quick Links</h3>
              <div className="links">
                <ul>
                  <li>
                    <Link to="/catalog">Explore</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <h3>Snappcoins</h3>
              <div className="links">
                <ul>
                  <li>
                    <Link to="/connect">Connect Wallet</Link>
                  </li>
                  <li>
                    <Link to="help.html">Faq</Link>
                  </li>
                  <li>
                    <Link to="become-partner.html">Become a Partner</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <h3>Resources</h3>
              <div className="links">
                <ul>
                  <li>
                    <Link to="#">Community</Link>
                  </li>
                  <li>
                    <Link to="#">How it Works</Link>
                  </li>
                  <li>
                    <Link to="#">Latest Products</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <h3>Keep in touch</h3>
              <div id="newsletter">
                <div id="message-newsletter"></div>
                <form method="post" name="newsletter_form" id="newsletter_form">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email_newsletter"
                      id="email_newsletter"
                      className="form-control"
                      placeholder="Your email"
                    />
                    <button type="submit" id="submit-newsletter">
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="follow_us">
                <ul>
                  <li>
                    <Link to="#0">
                      <img
                        src="assets/img/twitter_icon.svg"
                        alt=""
                        className="lazy"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="#0">
                      <img
                        src="assets/img/facebook_icon.svg"
                        alt=""
                        className="lazy"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="#0">
                      <img
                        src="assets/img/instagram_icon.svg"
                        alt=""
                        className="lazy"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="#0">
                      <img
                        src="assets/img/youtube_icon.svg"
                        alt=""
                        className="lazy"
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr />
          <div className="row add_bottom_25">
            <div className="col-md-6">
              <ul className="footer-selector clearfix">
                <li>
                  <div className="styled-select lang-selector">
                    <select>
                      <option value="English" defaultValue>
                        English
                      </option>
                      <option value="French">French</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Russian">Russian</option>
                    </select>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="additional_links">
                <li>
                  <Link to="#">Terms and conditions</Link>
                </li>
                <li>© 2023 Snappcoins</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div id="toTop"></div>

      <div id="modal-dialog" className="zoom-anim-dialog mfp-hide">
        <div className="modal_header">
          <h3>Snapp Now!</h3>
        </div>
        <form>
          <div className="sign-in-wrapper">
            <p>
              You are about to purchase <strong>"Amazing Art" #304</strong> from{" "}
              <strong>George Lucas</strong>
            </p>
            <div className="form-group">
              {" "}
              <label>Redeem With</label>
              <input
                type="text"
                className="form-control"
                placeholder="3.5 snapps"
                disabled
              />
            </div>

            <ul>
              <li>
                Your balance <span>8.498 snapps</span>
              </li>
              <li>
                Service fee 1.5%<span>0.125 snapps</span>
              </li>
            </ul>
            <div className="text-center">
              {" "}
              <input
                type="submit"
                className="btn_1 full-width mb-2"
                formAction="detail-page.html"
                value="Snapp It!"
              />
              <input
                type="submit"
                value="Cancel"
                className="btn_1 full-width outline"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Catalog;
