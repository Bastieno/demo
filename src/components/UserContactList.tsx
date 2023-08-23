import { User } from '../services/BluetoothSyncApi.service';
import UserContact from './UserContact';

type UserContactListProps = {
  listId: string,
  contactList: User[]
}

function UserContactList({ listId, contactList }: UserContactListProps) {
  return <div id={listId}>
    {contactList.map(contact => (
      <UserContact info={contact} key={contact.id} />
    ))}
  </div>;
}

export default UserContactList