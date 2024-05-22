import "../styles/table.css";

const Table = ({ data, sorting, sortConfig }) => {
  const getSortIcon = (col) => {
    if (sortConfig.key === col) {
      return sortConfig.order === "asc" ? "↑" : "↓";
    }
    return "";
  };

  return (
    <div className="table-wrapper">
      <table className="table-content">
        <thead>
          <tr>
            <th onClick={() => sorting("ratings_average")}>
              Average Ratings {getSortIcon("ratings_average")}
            </th>
            <th onClick={() => sorting("author_name")}>
              Author Name {getSortIcon("author_name")}
            </th>
            <th onClick={() => sorting("title")}>
              Title {getSortIcon("title")}
            </th>
            <th onClick={() => sorting("first_publish_year")}>
              Publish Year {getSortIcon("first_publish_year")}
            </th>
            <th onClick={() => sorting("subject")}>
              Subject {getSortIcon("subject")}
            </th>
            <th onClick={() => sorting("author_dob")}>
              Author DOB {getSortIcon("author_dob")}
            </th>
            <th onClick={() => sorting("author_top_work")}>
              Author Top Work {getSortIcon("author_top_work")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((book, index) => (
            <tr key={index}>
              <td>{book.ratings_average || "N/A"}</td>
              <td>{book.author_name || "N/A"}</td>
              <td>{book.title || "N/A"}</td>
              <td>{book.first_publish_year || "N/A"}</td>
              <td>{book.subject || "N/A"}</td>
              <td>{book.author_dob || "N/A"}</td>
              <td>{book.author_top_work || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
