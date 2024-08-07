import React, { useState } from "react";

function Form() {
  const [formData, setPostData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });
  

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPostData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((transaction) => console.log(transaction));
  };

  return (
    <form onSubmit={handleSubmit} className="formInput">
      <label>Date:</label>
      <input type="date" name="date" onChange={handleOnChange} value={formData.date} required />

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
      <button  type="submit">
        Add Transaction
      </button>
    </form>
  );
}

export default Form;
