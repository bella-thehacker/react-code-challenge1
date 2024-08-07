import React from 'react'
import Get from './Get'

function Table() {
  return (
   <table className='transactionTable'>
    <tbody>
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
    <Get />
    </tbody>
   </table>
  )
}

export default Table