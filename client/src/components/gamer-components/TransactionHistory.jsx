import React from 'react';
import transaction_style from '../../styles/transaction.css';
export default function TransactionHistory(props) {
	console.log("props are: ")
	console.log(props)
  return (
	    
		<div className=''>
			
			<ul style={{ listStyle: "none", padding: 0, marginLeft: "90px" }}>
				{/* Item starts here */}
				<li className="transaction-item">
					<div className="d-flex">
						<img src="assets/img/blog.jpg" alt="" className="transaction-image" />
						<div className="transaction-details">
							<p className="transaction-date">{props.tdate}</p>
							<p className="transaction-id">{props.tId}</p>
							<p className="transaction-status bgy mb-0">{props.status}</p> 
						</div>
					</div>
				</li>

				
			</ul>
		</div>
	);
}

                            