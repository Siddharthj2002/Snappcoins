import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function TransactionHistory() {
  const [vendorId, setVendorId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [searchText] = useState("");

  const navigate = useNavigate();

  const getVendorId = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/gaming-vendor-auth/verify-user",
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        setVendorId(data.vendor_id);
      } else {
        navigate("/gaming-vendor-login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVendorId();
  }, []);

  const getTransactionHistory = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/gaming-vendor-transactions/history/${vendorId}`
      );
      const data = await response.json();
      if (response.ok) {
        setTransactions(data.transactions);
      } else {
        console.log("Failed to retrieve transaction history");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactionHistory();
  }, [vendorId]);

  const searchTransactions = async (vendorId, keyword) => {
    try {
      const response = await fetch(
        `http://localhost:3001/gaming-vendor-transactions/search-transactions/${vendorId}/${keyword}`
      );
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.searchResults);
      } else {
        console.log("Failed to search transactions");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchText === "") {
      getTransactionHistory(vendorId);
    } else {
      searchTransactions(vendorId, searchText);
    }
  };

  return (
    <ul id="transaction-list" style={{ listStyleType: "none", padding: 0 }}>
      {transactions.map((transaction) => {
        const transactionDate = new Date(transaction.transaction_date)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, ".");

        return (
          // <li>
          //   <div className="transactionItem">
          //     <img
          //       src="assets/img/apple-touch-icon-57x57-precomposed.png"
          //       width={75}
          //       alt=""
          //       className="lazy"
          //     />
          //     <div className="transactionDetails">
          //       <div>{transactionDate}</div>
          //       <div>
          //         <a href="#">#{transaction.transaction_id}</a>
          //       </div>
          //       <div>
          //         <span className="badge bg-primary">
          //           {transaction.snappcoin_count} snapps
          //         </span>
          //       </div>
          //       <div>
          //         <span className={`badge ${transaction.statusClass}`}>
          //           {transaction.statusText}
          //         </span>
          //       </div>
          //     </div>
          //   </div>
          // </li>
          <div className="row py-3 px-3 mx-2 rounded form-group border">
            <div className="alignleft mt-4 my-3 mx-1 d-flex justify-content-center col-1">
                <Link to="#0">
                    <figure>
                        <img
                        src="assets/img/apple-touch-icon-57x57-precomposed.png"
                        className={`lazy`}
                        alt=""
                        height="50px"
                        />
                    </figure>
                </Link>
            </div>
            <div className="text-start col-6 w-75">
                <h6 className="my-1"><Link to="#" title="">Transaction id # {transaction.transaction_id}</Link></h6>
                <h6 className="my-2"><Link to="#">Date of transaction: {transactionDate}</Link></h6>
                {/* {props.transactionEntry === 'credit' ?<>
                    <h3 className="my-2"><Link to="#">Amount: {transaction.snappcoin_count} snaps</Link></h3>
                    <span className="badge bg-success text-light mx-1">Credit</span>
                </>:
                <>   
                    <h3 className="my-2"><Link to="#">Redeemed {props.snaps} snaps</Link></h3>
                    <span className="badge bg-danger text-light mx-1">Debit</span>
                </>} */}

                <h6 className="my-2"><Link to="#">Amount: {transaction.snappcoin_count} snaps</Link></h6>
                    <span className="badge bg-success text-light mx-1">{transaction.transaction_status}</span>
                {/* {props.status === "success" && <span className="badge bg-success text-light mx-1">Success</span>}
                {props.status === "pending" && <span className="badge bg-warning text-light mx-1">In Processing</span>}
                {props.status === "failure" && <span className="badge bg-danger text-light  mx-1">Failed</span>} */}
            </div>
        </div>
        );
      })}
    </ul>
  );
}

export default TransactionHistory;
