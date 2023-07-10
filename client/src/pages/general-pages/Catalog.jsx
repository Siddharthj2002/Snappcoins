import React, { useState, useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import Product from '../../components/general-components/Product';
import axios from "axios";
import Header from '../../components/general-components/Header';
import Filter from '../../components/general-components/Filter';
import PageComp from '../../components/general-components/PageComp';
import FilterUp from '../../components/general-components/FilterUp';
import Loader from '../../components/general-components/Loader';

const Catalog = (props) => {
	const { state } = useLocation();
	const searchTerm_home = state ? state.searchTerm_home : undefined;
	const [products, setProducts] = useState([])
	const [total_count, setCount] = useState(0)
	const [search_count, setSearchCount] = useState(0)
	const [genre, setgenre] = useState([])

	//pagination 
	const [searchTerm, setSearchTerm] = useState(searchTerm_home ? searchTerm_home : "")
	const [currentPage, setCurrentPage] = useState(1);
	const [h_price, setHprice] = useState(0)
	const [l_price, setLprice] = useState(0)
	const [UptoSnapp, setUptoSnapp] = useState(0)
	const [productsLoaded, setLoaded] = useState(false)
	const itemsPerPage = 9; // change the value here sasi
	useEffect(() => {
		setLoaded(false)
const fetchData = async () => {
  try {
    const params = {
      pagenum: currentPage,
      size: itemsPerPage,
      searchTerm: searchTerm,
      category: Array.from(genre),
      uptoSnapp: UptoSnapp
    };

    const response_prod = await axios.get('http://localhost:3001/api/merchandise/getall', { params });
    
    const { merchandises, total_count, search_count, h_price, l_price } = response_prod.data;
    
    setProducts(merchandises);
    setCount(total_count);
    setSearchCount(search_count);
    setHprice(h_price);
    setLprice(l_price);

    setLoaded(true);
  } catch (error) {
    console.error(error);
  }
};
		fetchData();

	}, [UptoSnapp,currentPage, searchTerm, genre]);

	// pagination logic
	const pagelength = Math.ceil(search_count / itemsPerPage)
	const start = 1;
	const end = pagelength;
	const pages = ["<<", "<"]; // represents  the starting page

	for (var i = start; i <= end; i++) {
		pages.push(i);
	}

	pages.push(">") // represents the ending page
	pages.push(">>")

	const Category = ['Art', 'Electronics', 'Stationary', 'Music', 'Wellness','Featured'];
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

	// const indexOfLastItem = currentPage * itemsPerPage;
	// const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	// const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

	//search functionality
	return (
		<>
			<Header />
			<main>
				<FilterUp >
					<div className="search_bar_list">
						<input type="text" className="form-control" placeholder="Search again..." value={searchTerm} onChange={(e) => {
							setSearchTerm(e.target.value)
						}
						} />
					</div>
				</FilterUp>

				<div className="container margin_30_40">
					<div className="page_header">
						<div className="breadcrumbs">
							<ul>
								<li><Link to="#">Home</Link></li>
								<li><Link to="#">Category</Link></li>
								<li>Page active</li>
							</ul>
						</div>
						<h1>All :</h1><span> {search_count} found</span>
					</div>

					<div className="row">

						< Filter>
							{Category.map((g) => {
								return (<li>
									<label class="container_check">{g}
										{/* <small>100</small> */}
										<input type="checkbox" value={g} onChange={(e) => {

											setgenre((prev) => {
												if (e.target.checked) {
													const temp = new Set(genre)
													temp.add(e.target.value)
													return temp
												}
												else {
													const temp = new Set(genre)
													temp.delete(e.target.value)
													return temp
												}
											})
										}} />
										<span class="checkmark"></span>
									</label>
								</li>)
							})}
							{
								<div className="collapse" id="filter_3">
									<div className="range_input">Price range from {l_price} to <span>{UptoSnapp}</span>  snapps</div>
									<div className="mb-4"><input type="range" min={l_price} max={h_price + 100} step="1" value={UptoSnapp} onChange={(e) => { e.target.value==0 ?  setUptoSnapp({h_price}) : setUptoSnapp(e.target.value) }} data-orientation="horizontal" /></div>
								</div>
							}

						</Filter>
						<div className="col-lg-9">

							{
								productsLoaded ? <div className="container-fluid">
									<div className='row'  >
										{search_count !== 0 ? products.map((product) => <Product price={product.price} desc={product.description} brand={product.brand} title={product.title} count={product.count} img={product.image} userid={product.userid} genre={product.category} />) : <p className='text-center'>No products Available</p>}
									</div>
									<div className='text-center'>
										<div className="pagination_fg mb-4">
											{search_count !== 0 ? pages.map((i) => {
												return <PageComp key={i} pagenum={i} handleClick={handleClick} isActive={currentPage == i ? true : false} />
											}) : null}
										</div>
									</div>
								</div> : <div className='row justify-content-center  mx-auto m-5'><Loader /></div>
							}
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
									<li><Link to="/catalog">Explore</Link></li>
									<li><Link to="/login">Login</Link></li>
									<li><Link to="/register">Register</Link></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-6">
							<h3>Snappcoins</h3>
							<div className="links">
								<ul>
									<li><Link to="/connect">Connect Wallet</Link></li>
									<li><Link to="help.html">Faq</Link></li>
									<li><Link to="become-partner.html">Become a Partner</Link></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-6">
							<h3>Resources</h3>
							<div className="links">
								<ul>
									<li><Link to="#">Community</Link></li>
									<li><Link to="#">How it Works</Link></li>
									<li><Link to="#">Latest Products</Link></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-6">
							<h3>Keep in touch</h3>
							<div id="newsletter">
								<div id="message-newsletter"></div>
								<form method="post" name="newsletter_form" id="newsletter_form">
									<div className="form-group">
										<input type="email" name="email_newsletter" id="email_newsletter" className="form-control" placeholder="Your email" />
										<button type="submit" id="submit-newsletter"><i className="bi bi-chevron-right"></i></button>
									</div>
								</form>
							</div>
							<div className="follow_us">
								<ul>
									<li><Link to="#0"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="img/twitter_icon.svg" alt="" className="lazy" /></Link></li>
									<li><Link to="#0"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="img/facebook_icon.svg" alt="" className="lazy" /></Link></li>
									<li><Link to="#0"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="img/instagram_icon.svg" alt="" className="lazy" /></Link></li>
									<li><Link to="#0"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="img/youtube_icon.svg" alt="" className="lazy" /></Link></li>
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
											<option value="English" selected>English</option>
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
								<li><Link to="#">Terms and conditions</Link></li>
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
						<p>You are about to purchase <strong>"Amazing Art" #304</strong> from <strong>George Lucas</strong></p>
						<div className="form-group"> <label>Redeem With</label>
							<input type="text" className="form-control" placeholder="3.5 snapps" disabled />
						</div>

						<ul>
							<li>
								Your balance <span>8.498  snapps</span>
							</li>
							<li>
								Service fee 1.5%<span>0.125  snapps</span>
							</li>

						</ul>
						<div className="text-center"> <input type="submit" className="btn_1 full-width mb-2" formaction="detail-page.html" value="Snapp It!" />
							<input type="submit" value="Cancel" className="btn_1 full-width outline" />
						</div>
					</div>
				</form>

			</div>




		</>
	)
}
export default Catalog;