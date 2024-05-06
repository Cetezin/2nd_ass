const Paginate = ({ repoPerPage, totalRepo, paginate, previousPage, nextPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRepo / repoPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <ul>
        <li onClick={previousPage}>Prev</li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className="page-number"
          >
            {number}
          </li>
        ))}
        <li onClick={nextPage}>Next</li>
      </ul>
    </div>
  );
};

export default Paginate;