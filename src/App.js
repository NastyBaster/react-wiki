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
  let [pageNumber, setPageNumber] = useState(1);
  let [search, setSearch] = useState("");
  let [fetchedData, setFetchedData] = useState({ info: {}, results: [] });
  let { info, results } = fetchedData;
  let [status, updateStatus] = useState("");
  let [gender, updateGender] = useState("");
  let [species, updateSpecies] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        let firstRes = await fetch(
          `https://rickandmortyapi.com/api/character/?page=1`,
        );
        let firstData = await firstRes.json();

        const totalPages = firstData.info.pages;
        let allData = [...firstData.results];
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        for (let i = 2; i <= totalPages; i++) {
          await sleep(100);

          let res = await fetch(
            `https://rickandmortyapi.com/api/character/?page=${i}`,
          );

          if (res.status === 429) {
            await sleep(2000);
            res = await fetch(
              `https://rickandmortyapi.com/api/character/?page=${i}`,
            );
          }

          let data = await res.json();
          if (data.results) {
            allData = [...allData, ...data.results];
          }
        }

        setFetchedData({ results: allData });
      } catch (error) {
        console.error("Помилка завантаження даних:", error);
      }
    };

    fetchAll();
  }, []);

  const filteredResults = fetchedData.results?.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  const itemsPerPage = 20;
  const lastItemIndex = pageNumber * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const currentItems = filteredResults?.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="App">
      <h1 className="text-center mb-3">Characters</h1>
      <Search setSearch={setSearch} setPageNumber={setPageNumber} />
      <div className="container">
        <div className="row">
          Filter component will be placed here
          <div className="col-lg-8 col-12">
            <div className="row">
              <Card results={currentItems} />
            </div>
          </div>
        </div>
      </div>
      <Pagination
        info={{
          pages: Math.ceil((filteredResults?.length || 0) / itemsPerPage),
        }}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}

export default App;
