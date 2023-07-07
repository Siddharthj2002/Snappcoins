import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TransactionHistory() {
  const [vendorId, setVendorId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getVendorId();
    getTransactionHistory(vendorId);
  }, []);

  const getVendorId = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/gaming-vendor-auth/verify-user",
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

  const getTransactionHistory = async (vendorId) => {
    try {
      const response = await fetch(
        `http://localhost:3002/gaming-vendor-transactions/history/${vendorId}`
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

  const searchTransactions = async (vendorId, keyword) => {
    try {
      const response = await fetch(
        `http://localhost:3002/gaming-vendor-transactions/search-transactions/${vendorId}/${keyword}`
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
          <li>
            <div className="transactionItem">
              <img
                src="assets/img/apple-touch-icon-57x57-precomposed.png"
                width={75}
                alt=""
                className="lazy"
              />
              <div className="transactionDetails">
                <div>{transactionDate}</div>
                <div>
                  <a href="#">#{transaction.transaction_id}</a>
                </div>
                <div>
                  <span className="badge bg-primary">
                    {transaction.snappcoin_count} snapps
                  </span>
                </div>
                <div>
                  <span className={`badge ${transaction.statusClass}`}>
                    {transaction.statusText}
                  </span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TransactionHistory;
