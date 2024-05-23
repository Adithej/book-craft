import "../styles/search.css";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa6";

let headers = [
  { label: "Author DOB", key: "author_dob" },
  { label: "Author Name Name", key: "author_name" },
  { label: "Author Top Work", key: "author_top_work" },
  { label: "First Publish Year", key: "first_publish_year" },
  { label: "Ratings Average", key: "ratings_average" },
  { label: "Subject", key: "subject" },
  { label: "Title", key: "title" },
];

const Search = ({
  searchQuery,
  handleSearchChange,
  handleSearchSubmit,
  bookData,
}) => {
  return (
    <div className="search">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search author"
        />
        <button type="submit">Search</button>
      </form>
      <button className="btn-csv">
        <CSVLink data={bookData} headers={headers}>
          Download <FaFileCsv />
        </CSVLink>
      </button>
    </div>
  );
};

export default Search;
