import React from "react";

import SearchList from "./SearchList";

function Table({ data }) {
  return (
    <table className="transactionTable">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>

      <SearchList results={data} />
    </table>
  );
}

export default Table;
