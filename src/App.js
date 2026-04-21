import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect } from "react";
import Search from "./components/Search/Search";
import Card from "./components/Card/Card";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  let [pageNumber, updatePageNumber] = useState(3);
  let [search, setSearch] = useState("");
  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}`;
  let [fetchedData, updateFetchedData] = useState({ info: {}, results: [] });
  let { info, results } = fetchedData;

  useEffect(() => {
    (async function () {
      let data = await fetch(api)
        .then((res) => res.json())
        .catch((err) => {
          console.log("Network error: ", err);
          return null;
        });
      if (data && !data.error) {
        updateFetchedData(data);
      } else if (data?.error) {
        console.log("API says: ", data.error);
        updateFetchedData((prev) => ({ ...prev, results: [] }));
      }
    })();
  }, [api]);

  return (
    <div className="App">
      <h1 className="text-center mb-3">Characters</h1>
      <Search setSearch={setSearch} updatePageNumber={updatePageNumber} />
      <div className="container">
        <div className="row">
          Filter component will be placed here
          <div className="col-lg-8 col-12">
            <div className="row">
              <Card results={results} />
            </div>
          </div>
        </div>
      </div>
      <Pagination
        info={info}
        pageNumber={pageNumber}
        updatePageNumber={updatePageNumber}
      />
    </div>
  );
}

export default App;
