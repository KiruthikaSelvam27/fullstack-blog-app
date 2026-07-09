function Pagination({ currentPage, totalPages, onPrevious, onNext, loading }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination" aria-label="Posts pagination">
      <button
        type="button"
        className="button button--secondary pagination__button"
        onClick={onPrevious}
        disabled={currentPage <= 1 || loading}
      >
        Previous
      </button>

      <span className="pagination__info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        className="button button--secondary pagination__button"
        onClick={onNext}
        disabled={currentPage >= totalPages || loading}
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
