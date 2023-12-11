import React from "react";


export default function Pagination({ currentPage, totalPages, onPageChange }){
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      {pageNumbers.map((page) => (
        <button key={page} onClick={() => onPageChange(page)} disabled={currentPage === page}>
          {page}
        </button>
      ))}
    </div>
  );
};


