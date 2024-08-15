# Bank Of Flatiron
This project shows a page that allows users to put their banking transactions and search for them when they need to find them. the transactions have dates, description, category and amount.

This is the live link: bank-of-flariron-git-main-ivys-projects-5c328d9e.vercel.app

## Project Requirements
## Instructions

For this project, you’ll be building out a React application that displays a
list of your recent bank transactions, among other features.

Part of what this code challenge is testing is your ability to follow given
instructions. While you will definitely have a significant amount of freedom in
how you implement the features, be sure to carefully read the directions for
setting up the application.

## Setup

After unbundling the project:

1. Run `npm install` in your terminal.
2. Run `npm run server`. This will run your backend on port `8001`.
3. In a new terminal, run `npm start`. This will run your React app on port `8000`.

Make sure to open
[http://localhost:8001/transactions](http://localhost:8001/transactions) in the
browser to verify that your backend is working before you proceed!

The app uses [Semantic UI](https://semantic-ui.com/) for styling. If you see any
unfamiliar classNames on some components, don't sweat! That's coming from
Semantic UI and you shouldn't need to touch it.

If you are unfamiliar with HTML tables, take a look at the
[docs with an example here](https://www.w3schools.com/html/html_tables.asp)

## Endpoints

The base URL for your backend is: `http://localhost:8001`

## Core Deliverables

As a user, I should be able to:

- See a table of the transactions.
- Fill out and submit the form to add a new transaction. This should add the new
  transaction to the table **as well as post the new transaction to the backend
  API for persistence**.
- Filter transactions by typing into the search bar. Only transactions with a
  description matching the search term should be shown in the transactions
  table.

## Content of files
 ### Components
 #### The App component 
 It handles the initial fetch data and passes them as props to its child components.
 ```js
 import React, { useEffect, useState } from "react";
import "../App.css";

import Form from "./Form";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Table from "./Table";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("https://bank-of-flatiron-five-ashy.vercel.app/transactions")
      .then((res) => res.json())
      .then((transactions) => setTransactions(transactions))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Header />
      <SearchBar setResults={setResults} />

      <Form transactions={transactions} setTransactions={setTransactions} />
      <Table data={results.length > 0 ? results : transactions} />
    </div>
  );
}

export default App;
```
#### The Header Component 
It contains the title of the page

#### The SearchBar component
This component filters out the data from the db.json file when letters are typed in the search bar. When a letter is typed on the search bar names descriptions that contain the letter typed are seen by the user

```js
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ setResults }) {
  const [search, setSearch] = useState("");

  const fetchData = (value) => {
    fetch("https://bank-of-flatiron-five-ashy.vercel.app/transactions")
      .then((res) => res.json())
      .then((transactions) => {
        const results = transactions.filter((transaction) =>
          transaction.description.toLowerCase().includes(value.toLowerCase())
        );
        setResults(results);
        // console.log(results);
      })
      .catch((error) => console.log(error));
  };
  const handleChange = (value) => {
    setSearch(value);
    fetchData(value);
  };
  return (
    <div className="searchInput">
      <FaSearch className="search-icon" />{" "}
      <input
        type="search"
        placeholder="Search Your Recent Transactions"
        value={search}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
    </div>
  );
}

export default SearchBar;
```

#### Form component 
This component creates a form in the DOM and ensures that data input in the DOM is added to the json server upon submission.
The form also ensures that the contents are added live and the user does not need to refresh the page.

```js
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

    fetch("https://bank-of-flatiron-five-ashy.vercel.app/transactions", {
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
```

#### Table component
Tis component gives table headers to the table and ensures that if nothing is being typed in the search bar then all the content in the json server is being displayed but if something is typed then the filtered items will be displayed. This is passed as a prop in the table component

```js
 <Table data={results.length > 0 ? results : transactions} />
 ```



#### Search List 
This component ensures that if the user types something in the search bar then the items filtered which contain the letters of what was typed will be seen by the user.

```js
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
```
### Display List
This component gives the table data of each transaction in the json file.

## Credits
- I employed the help of [www.w3schools.com] How to make some of the js functions.

- I used https://moringa.instructure.com/courses/777/modules
notes from Moringa School nd some of the videos to figure out how to do it.

 - I was also able to get the idea of an interface from [www.youtube.com] where i found a couple of videos that helped me make my javascript file and the html file https://www.youtube.com/watch?v=80Hzj6xmcVc


 ## Privacy and Copyright
>>>>>>> 5b46c03 (modified readme)
Copyright (c) [2024] [Ivy Nyambura]

@@ -71,3 +143,13 @@ AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNEC
