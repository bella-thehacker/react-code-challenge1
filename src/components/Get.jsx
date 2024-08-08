import React, { useEffect } from "react";

function Get({ setTransactions }) {
  useEffect(() => {
    fetch("https://bank-of-flatiron-five-ashy.vercel.app/transactions")
      .then((res) => res.json())
      .then((transactions) => setTransactions(transactions))
      .catch((error) => console.log(error));
  }, []);

  return null;
}

export default Get;
