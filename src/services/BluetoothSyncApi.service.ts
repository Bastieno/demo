export type User = {
  id: string;
  name: string | null;
  email: string;
  picture: string | null;
  phone: string | null;
  registered: {
    date: string;
  }
}

export default class BluetoothSyncAPIService {
  static BLUETOOTH_SYNC_API =
    'https://randomuser.me/api/?results=1000&&orderby=!registered';



  static randomSync = async () => {
    const shouldThrowError = Math.random() < 0.5;
    if (shouldThrowError) {
      throw new Error('Random error occurred');
    } else {
      return BluetoothSyncAPIService.sync()
    }
  }

  static sync = async () => {
    const result = await fetch(BluetoothSyncAPIService.BLUETOOTH_SYNC_API);
    const data = await result.json();

    const users: User[] = data.results.map((user: any) => ({
      id: user.email || `${user.name.first} ${user.name.last}`,
      name: user.name.first || null,
      email: user.email,
      picture: user.picture.thumbnail || '',
      phone: user.phone || user.cell || '',
      registered: {
        date: user.registered.date,
      },
    }));

    const validatedUsers = users.map(user => {
      let { name, phone, picture } = user;

      const phonelength = (phone as string).length;
      const isPhonelengthValid = phonelength >= 8 && phonelength <= 14;

      const imgUrl = new URL(picture as string);
      const isImgUrlValid = imgUrl.protocol === 'http:' || imgUrl.protocol === 'https:';

      if (name && name.length > 20) {
        name = name.substring(0, 20)
      }

      if (!isPhonelengthValid) {
        phone = null;
      }

      if (!isImgUrlValid) {
        picture = null
      }

      return {
        ...user,
        name,
        phone,
        picture
      }
    });

    // const validatedUsers = users.filter(user => {
    //   let { name, phone, picture } = user;

    //   const phonelength = (phone as string).length;
    //   const isPhonelengthValid = phonelength >= 8 && phonelength <= 14;

    //   const imgUrl = new URL(picture as string);
    //   const isImgUrlValid = imgUrl.protocol === 'http:' || imgUrl.protocol === 'https:';

    //   if (name && name.length > 20) {
    //     name = name.substring(0, 20)
    //   }

    //   if (!isPhonelengthValid) {
    //     phone = null;
    //   }

    //   if (!isImgUrlValid) {
    //     picture = null
    //   }

    //   return (name && picture && phone);
    // });

    console.log('validatedUsers :>> ', validatedUsers);

    return validatedUsers;
  };
}
