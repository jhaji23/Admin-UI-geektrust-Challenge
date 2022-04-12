import React from "react";

function Pagination({ show, usersPerPage, totalUsers, currentPage, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  if (show) {
    return (
      <>
        <div className="btn-group align-center">
          {pageNumbers.map((item) => (
            <button
              onClick={() => paginate(item)}
              key={item}
              className={"btn " + (item === currentPage ? "btn-active" : "")}
            >
              {item}
            </button>
          ))}
        </div>
      </>
    );
  }
}

export default Pagination;
