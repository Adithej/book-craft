import "../styles/page.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "../components/Search";
import Table from "../components/Table";
import TableLoading from "../components/TableLoading";

const Home = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("tolkien");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", order: "asc" });
  // console.log(bookData);

  useEffect(() => {
    setTriggerSearch(true);
  }, []);

  useEffect(() => {
    const fetchBookAndAuthorData = async () => {
      if (!searchQuery.trim()) {
        setError("Please enter a valid author name");
        setBookData([]);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const bookResponse = await axios.get(
          `https://openlibrary.org/search.json?author=${encodeURIComponent(
            searchQuery
          )}&page=${currentPage}&limit=${pageSize}`
        );

        const books = bookResponse.data.docs.map((book) => ({
          ratings_average: book.ratings_average,
          author_name: book.author_name[0],
          title: book.title,
          first_publish_year: book.first_publish_year,
          subject: book.subject ? book.subject[0] : null,
        }));

        if (books.length === 0) {
          throw new Error("No books found for the author");
        }

        const authorNames = [...new Set(books.map((book) => book.author_name))];

        const authorPromises = authorNames.map((name) =>
          axios.get(
            `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(
              name
            )}`
          )
        );
        const authorResponses = await Promise.all(authorPromises);

        const authorDataDict = authorResponses.reduce((acc, response) => {
          const authorData = response.data.docs[0];
          acc[authorData.name] = authorData;
          return acc;
        }, {});

        const updatedBooks = books.map((book) => {
          const authorName = book.author_name;
          const authorData = authorDataDict[authorName];
          return {
            ...book,
            author_dob: authorData ? authorData.birth_date : "N/A",
            author_top_work: authorData ? authorData.top_work : "N/A",
          };
        });

        setBookData(updatedBooks);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (triggerSearch) {
      fetchBookAndAuthorData();
      setTriggerSearch(false);
    }
  }, [triggerSearch, searchQuery, currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setTriggerSearch(true);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1);
    setTriggerSearch(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setTriggerSearch(true);
  };

  const sorting = (col) => {
    let newOrder = "asc";
    if (sortConfig.key === col && sortConfig.order === "asc") {
      newOrder = "desc";
    }
    setSortConfig({ key: col, order: newOrder });

    const sortedData = [...bookData].sort((a, b) => {
      if (typeof a[col] === "number" && typeof b[col] === "number") {
        return newOrder === "asc" ? a[col] - b[col] : b[col] - a[col];
      } else if (typeof a[col] === "string" && typeof b[col] === "string") {
        return newOrder === "asc"
          ? (a[col] || "").localeCompare(b[col] || "")
          : (b[col] || "").localeCompare(a[col] || "");
      } else {
        return 0;
      }
    });

    setBookData(sortedData);
  };

  return (
    <>
      <h2 className="head">Welcome to the Admin panel</h2>
      <div className="container">
        <Search
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
          bookData={bookData}
        />

        {loading && <TableLoading type="spin" color="#000" />}
        {error && <div>{error}</div>}
        {!loading && !error && bookData.length > 0 && (
          <Table data={bookData} sorting={sorting} sortConfig={sortConfig} />
        )}
        <div className="pagination-controls">
          <label htmlFor="pageSize">Records per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>Page {currentPage}</span>
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
