import ReactLoading from "react-loading";

function TableLoading({ type, color }) {
  const rows = Array.from({ length: 10 });

  return (
    <div className="table-wrapper">
      <table className="table-content">
        <thead>
          <tr>
            <th>Average Ratings</th>
            <th>Author Name</th>
            <th>Title</th>
            <th>First Publish Year</th>
            <th>Subject</th>
            <th>Author DOB</th>
            <th>Author Top Work</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {Array.from({ length: 7 }).map((_, cellIndex) => (
                <td key={cellIndex}>
                  <ReactLoading
                    type={type}
                    color={color}
                    height="1rem"
                    width="1rem"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableLoading;
