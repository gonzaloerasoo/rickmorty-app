import "./Pagination.css";

export default function Pagination({
  currentPage,
  totalPages,
  visiblePages,
  showPrevEllipsis,
  showNextEllipsis,
  goToPage,
}) {
  return (
    <div className="pagination-controls">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      <button
        onClick={() => goToPage(1)}
        className={currentPage === 1 ? "active" : ""}
      >
        1
      </button>

      {showPrevEllipsis && (
        <button onClick={() => goToPage(visiblePages[0] - 1)}>...</button>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      {showNextEllipsis && (
        <button
          onClick={() => goToPage(visiblePages[visiblePages.length - 1] + 1)}
        >
          ...
        </button>
      )}

      <button
        onClick={() => goToPage(totalPages)}
        className={currentPage === totalPages ? "active" : ""}
      >
        {totalPages}
      </button>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}
