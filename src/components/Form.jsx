import React from "react";
import Table from "./Table";

function Form() {
  return (
    <main>
    <form className="formInput">
      <label>Date:</label>
      <input type="date"  required/>

      <input type='text' placeholder='Description' required/>
        <input type='text' placeholder='Category' required/>
        <input type='text' placeholder='Amount' required/>
        <button type="submit">Add Transaction</button>
    </form>

    <Table />
    </main>

    
  );
}

export default Form;
