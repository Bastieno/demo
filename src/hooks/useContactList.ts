import { useState, useRef } from 'react';
import BluetoothSyncAPI, { User } from '../services/BluetoothSyncApi.service';

export type SyncState = 'loading' | 'synced' | 'failed' | 'idle';

async function retry<T>(cb: () => Promise<T>, count = 3): Promise<T> {
  try {
    const response = await cb();

    return response;
  } catch (error) {
    if (count > 0) {
      console.log(`Retrying request. ${count} retries left.`);
      return retry(cb, count - 1);
    } else {
      throw new Error('Failed to sync data');
    }
  }
}

/**
 * Custom React Hook responsible for sync with the Car's Bluetooth API
 */
const useContactList = () => {
  const [list, setList] = useState<User[]>([]);
  const [filteredList, setFilteredList] = useState<User[]>([]);
  const [isSyncing] = useState(false);
  const [syncState, setSyncState] = useState<SyncState>('idle');
  const [offset, setOffset] = useState(0);
  const count = useRef(5);

  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Call next page
   */
  const nextPage = () => {
    /**
     * if the offset plus count is less than the length of the list
     * set offset + count
     * update the offset to trigger a re-render
     **/
    setOffset(prev => prev + count.current)
    setCurrentPage(prev => prev + 1)
  };

  /**
   * Call previous page
   */
  const prevPage = () => {
    /**
     * if offset  less count greater than 0
     * set offset - count
     * update the offset to trigger a re-render
     *
     */
    setOffset((prev) => prev - count.current);
    setCurrentPage((prev) => prev - 1);
  };

  const onFilter = (term: string) => {
    const filteredUsers = list.filter(user => user.name?.includes(term) || user.email.includes(term))
    setFilteredList(filteredUsers);
    setOffset(0);
    setCurrentPage(1);
  };

  /**
   * Call the Bluetooth API and update the list
   */
  const sync = async () => {
    try {
      setSyncState('loading');
      const users = await retry(BluetoothSyncAPI.randomSync)
      const shouldDisableSync = users.length > 0
      setList(users);
      setFilteredList(users);
      setSyncState(shouldDisableSync ? 'synced' : 'failed')
      setOffset(0);
      setCurrentPage(1);
    } catch (error) {
      console.log('error :>> ', error);
      setSyncState('failed')
    }
  };

  /**
   * Return the necessary functions
   */
  return {
    // Full list
    contactList: list,
    // Current page list
    currentPageList: filteredList.slice(offset, offset + count.current),
    // currentPageList: temp,
    // // function used to sync with the Bluetooth API
    sync,
    // function to move the poiter to the next page
    nextPage,
    // function to mobe the pointer to the previous page
    prevPage,
    // variable that holds the value to indicate if the next page will be available or not
    hasNextPage: !(offset + count.current < filteredList.length),
    // variable that holds the value to indicate if the previous page will be available or not
    hasPrevPage: offset < count.current,
    // holds the value is the api is syncing or not
    isSyncing,
    // Current page number
    // page: offset > 0 ? offset / count.current : offset,
    page: currentPage,
    // Current page number
    totalPages: Math.ceil(filteredList.length / count.current),
    // The total os records
    total: filteredList.length,
    //
    onFilter,
    syncState,
    pageSize: count.current,
    offset,
  };
};

export default useContactList;
