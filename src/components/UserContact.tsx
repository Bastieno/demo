import { User } from '../services/BluetoothSyncApi.service'

type UserContactProps = {
  info: User
}

function UserContact({ info }: UserContactProps) {
  const {
    id,
    picture,
    name,
    phone
  } = info
  if (!name || !picture || !phone) return null
  return (
    <div className='userContact' id={id}>
      <div className="imgContainer">
        <img src={picture} alt={name} />
      </div>
      <div>
        <p>{name}</p>
        <p>{phone}</p>
      </div>
    </div>
  )
}

export default UserContact