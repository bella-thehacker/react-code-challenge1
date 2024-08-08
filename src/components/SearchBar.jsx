import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ setResults }) {
  const [search, setSearch] = useState("");

  const fetchData = (value) => {
    fetch("https://bank-of-flatiron-five-ashy.vercel.app/transactions")
      .then((res) => res.json())
      .then((transactions) => {
        const results = transactions.filter((transaction) =>
          transaction.description.toLowerCase().includes(value.toLowerCase())
        );
        setResults(results);
        // console.log(results);
      })
      .catch((error) => console.log(error));
  };
  const handleChange = (value) => {
    setSearch(value);
    fetchData(value);
  };
  return (
    <div className="searchInput">
      <FaSearch className="search-icon" />{" "}
      <input
        type="search"
        placeholder="Search Your Recent Transactions"
        value={search}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
    </div>
  );
}

export default SearchBar;
