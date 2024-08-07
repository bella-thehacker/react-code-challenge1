import React,{ useEffect, useState } from "react";
import "../App.css";

import Form from "./Form";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Table from "./Table";



function App() {
  const [transactions, setTransactions] = useState([]);
  const [results, setResults] = useState([])
  

  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((res) => res.json())
      .then((transactions) => setTransactions(transactions))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Header />
      <SearchBar setResults={setResults}/>
      
      <Form transactions={transactions} setTransactions={setTransactions} />
      <Table  data={results.length > 0 ? results :transactions}/>
        
      
    </div>
  );
}

export default App;
