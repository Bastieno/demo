import Header from './Header';
import Paginator from './Paginator';
import UserContactList from './UserContactList';
import useContactList from '../hooks/useContactList';

function Page() {
  const {
    prevPage,
    nextPage,
    sync,
    currentPageList,
    page,
    onFilter,
    totalPages,
    syncState,
  } = useContactList();

  console.log({
    currentPageList,
  });

  return (
    <div>
      <Header syncState={syncState} sync={sync} onFilter={onFilter} />
      {/* Do not edit test id in below div, it's added for testing purpose */}
      <div data-testid='user-contact-list-wrapper'>
        {syncState === 'failed' ? (
          'Failed to sync data'
        ) : (
          <>
            <UserContactList listId='page' contactList={currentPageList} />
            <Paginator
              prevPage={prevPage}
              nextPage={nextPage}
              page={page}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
