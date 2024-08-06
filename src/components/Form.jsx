import React from "react";

function Form() {
  return (
    <form className="formInput">
      <label>Date:</label>
      <input type="text" placeholder="mm/dd/yyyy" required/>

      <input type='text' placeholder='Description' required/>
        <input type='text' placeholder='Category' required/>
        <input type='text' placeholder='Amount' required/>
        <button type="submit">Add Transaction</button>
    </form>
  );
}

export default Form;
