import { useState } from 'react';
import type { SyncState } from '../hooks/useContactList';

type HeaderProps = {
  syncState: SyncState;
  sync: () => void;
  onFilter: (term: string) => void;
};

function Header({ sync, onFilter, syncState }: HeaderProps) {
  const [term, setTerm] = useState('');

  return (
    <div className='contactInfoHeaderWrapper'>
      <div>Car Dashboard</div>
      <div>
        <input
          value={term}
          onChange={(e) => {
            const { value } = e.target;
            setTerm(value);
            onFilter(value);
          }}
        />
      </div>
      <div>
        <button disabled={syncState === 'synced'} onClick={sync}>
          {syncState === 'loading'
            ? 'Syncing'
            : syncState === 'synced'
            ? 'Synced'
            : 'Sync'}
        </button>
      </div>
    </div>
  );
}

export default Header;
