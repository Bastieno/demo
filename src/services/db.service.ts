export default class DbService {
  static _usersCacheKey = 'usersContactList';

  /**
   * Return data from the localStorage cache.
   */
  static getCache = () => {
    return JSON.parse(localStorage.getItem(DbService._usersCacheKey) || '');
  };

  /**
   * Save data to the local storage cache.
   */
  static setCache = (value: any) => {
    localStorage.setItem(DbService._usersCacheKey, JSON.stringify(value));
  };

  /**
   * Save the complete users list to caceh.
   */
  static getUsersList = () => {
    return DbService.getCache();
  };

  /**
   * Save the complete users list to caceh.
   */
  static saveUsersList = (usersList: any) => {
    DbService.setCache(usersList);
  };

  /**
   * Save the complete users list to cache.
   */
  static updateUsersList = (user: any) => {
    let usersList = DbService.getCache();
    usersList = [...usersList, user];
    DbService.setCache(usersList);
    return usersList;
  };
}
