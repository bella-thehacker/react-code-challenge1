import React from "react";
import Display from "./Display";

function SearchList({ results }) {
  if (results.length === 0) {
    return (
      <tbody>
        <tr>
          <td color="4">No Transaction found</td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {results.map((result) => (
        <Display
          key={result.id}
          date={result.date}
          description={result.description}
          category={result.category}
          amount={result.amount}
        />
      ))}
    </tbody>
  );
}

export default SearchList;
