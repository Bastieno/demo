type PaginatorProps = {
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
  page: number;
};

function Paginator({
  totalPages,
  prevPage,
  nextPage,
  page,
}: PaginatorProps) {
  return totalPages > 1 ? (
    <div className='contactInfoPaginatorWrapper'>
      <div>
        Page {page} of {totalPages}
      </div>
      <div className='contactInfoPaginatorButtons'>
        <button disabled={page === 1} onClick={prevPage}>
          prev
        </button>
        <button disabled={page === totalPages} onClick={nextPage}>
          next
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Paginator;
