## Problem Statement

#### **Turing Practical Challenge: Managing a User Contact List**

#### **Background Story**

We are creating the next generation of Intelligent Dashboards for Electric Cars. One of these functions is synchronization of user contact list from a cell phone to the dashboard. However, the current version of the application is not always working as intended. The sync functionality on the dashboard syncs the user’s Contact List from their cellphone using the Bluetooth Sync API 2.0. This API retrieves the user’s cellphone list and returns the contact list information.

In this challenge, there are 3 tasks that you have to complete in sequential order. This challenge will last **45 mins**. We have prepared a set of example tests that you may find in `./task/src/tests/test_main.test.js`.

## Specifications

- The contact response payload contains data about a single contact as follows:
   - `name` - Name of the contact
   - `email?` - Email address of the contact
   - `picture` - The picture of the contact
   - `phone` - The contact’s phone number
   - `registered.date` - When the record was added to the user’s phone

### Validations ###

The data should be validated before presenting to avoid showing broken records to the users:

- The name should not be longer than 20 **characters**. If it’s longer, it needs to be chopped.
- The phone_number should have between 8 and 14 **characters** and should be a valid string
- The picture should be a valid HTTP URL

If the validation failed for one of the data, the value of the field should be set `null`. If the `name`, `picture` or `phone` are empty, we should not display the record in the list.

Styling does not matter for tasks 1 and 2.

#### Task 1

The React application will be shown on the new 2023 Electric vehicle Dashboard. It contains a page with a sync button to call the **Bluetooth Sync API 2.0**. Your task is to implement the button to perform this synchronization task.

1. Implement the **Bluetooth Sync API 2.0** fake API
   1. Call the GET endpoint `https://randomuser.me/api/?results=1000&&orderby=!registered` and return a promise (must use `fetch` browser API to make the API call)
2. When the driver hits the `sync button`, the application should invoke the **Bluetooth Sync API 2.0** to fetch the data from the server and present the Contact Info to the user accordingly
3. The `sync button` will be disabled if the application syncs the data with the server
4. Synchronization error can happen. In this case, if the request fails after 3 retries, display `"Failed to sync data"` error message on the screen

[Image 1](https://ibb.co/ZVPYMpg)

#### Task 2

1. Create a component to receive a **Contact** by props and display the **Contact Info**. The component should display an image, the name, and the phone number
2. The component should only display the image, name, and phone number
3. The Contact Info element should have a unique **#id** attribute in their wrapper HTML Tag

<!-- **_img_**: -->

[Image 2](https://ibb.co/dgXhqyv)


#### Task 3

1. Create a component to receive by props an **Array of Contacts** and uses the **Contact Info Component** to display the list of the User’s Contacts.
2. Due to screen size limitations, the new **Dashboard** can only display five records at a time
3. Implement the pagination button at the bottom to move the list forward and backward
4. Implement the filter input at the header to filter the records by either name or e-mail and update the list and reset the pagination

Ex:

[Image 3](https://ibb.co/5xR8Pj4)

**Note:** It’s expected that some unit test cases with the existing project will pass by default. There will be additional hidden test cases in place to determine your final test result.


## **How to run the problem**

- Cd to project directory:

  ```bash
   cd task/
  ```

- Install all the dependencies by running below command:
  ```bash
  npm install
  ```
- To start the server:
  ```bash
  npm start
  ```
- To run tests:
  ```bash
  npm run test
  ```