import React from 'react'

function Form() {
  return (
    <form>
        <div>
        <input type='text' placeholder='mm/dd/yyyy'></input>
        <label >Date</label>
        </div>
        <input type='text' placeholder='Description'> </input>
        <input type='text' placeholder='Category'></input>
    </form>
  )
}

export default Form