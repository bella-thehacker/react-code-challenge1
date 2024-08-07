import React from 'react'
import Get from './Get'

function Table() {
  return (
   <table className='transactionTable'>
    <thead>
        <tr>
            <th>
             Date
            </th>
            <th>
                Description
            </th>
            <th>
                Category
            </th>
            <th>
                Amount
            </th>
        </tr>
    
    </thead>
    <Get />
   </table>
  )
}

export default Table