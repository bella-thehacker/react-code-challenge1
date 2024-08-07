import React, { useEffect } from "react";

function Get({ setTransactions }) {
  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((res) => res.json())
      .then((transactions) => setTransactions(transactions))
      .catch((error) => console.log(error));
  }, []);

  return null;
}

export default Get;
