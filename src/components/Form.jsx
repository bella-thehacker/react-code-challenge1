import React, { useState } from "react";

function Form({ transactions, setTransactions }) {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((transaction) => {
        setTransactions((preTransactions) => [transaction, ...preTransactions]);

        setFormData({
          date: "",
          description: "",
          category: "",
          amount: "",
        });
        setIsPending(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="formInput">
      <label>Date:</label>
      <input
        type="date"
        name="date"
        onChange={handleOnChange}
        value={formData.date}
        required
      />

      <input
        type="text"
        placeholder="Description"
        name="description"
        onChange={handleOnChange}
        value={formData.description}
        required
      />
      <input
        type="text"
        placeholder="Category"
        name="category"
        onChange={handleOnChange}
        value={formData.category}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        name="amount"
        onChange={handleOnChange}
        value={formData.amount}
        required
      />
      {!isPending && <button type="submit">Add Transaction</button>}

      {isPending && (
        <button disabled type="submit">
          Adding Transaction...
        </button>
      )}
    </form>
  );
}

export default Form;
