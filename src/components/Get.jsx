import React, { useEffect, useState } from "react";
import Display from "./Display";

function Get() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((res) => res.json())
      .then((transactions) => setTransactions(transactions))
      .catch((error) => console.log(error));
  }, []);

  const listTransactions = transactions.map((transaction) => (
    <Display key={transaction.id} date={transaction.date} 
    description={transaction.description} category={transaction.category} amount={transaction.amount}/>
  ));
  return <div>{listTransactions}</div>;
}

export default Get;
