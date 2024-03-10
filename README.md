### Employee Management System
## How to run project

# Frontend 
Inside frontend directory

- npm install
- npm run dev
  
This is run the application.

# Backend

Inside backend directory
- npm install
- node index.js
This is run the backend server

## APIs : 
- POST - /manage/api/signup - Checks if user already exists if not then add a new in database and returns a jwt authentication token
- POST - /manage/api/signin - Checks if user is valid or not and returns a jwt authentication token

## APIs that only work with Authentication token (Following are the mutlipart/form-data calls)
- POST - /manage/api/employee/add  -  To add a new employee in the database
- GET  -  /manage/api/employee/show - Fetches the list of employee details from the database
- PUT  -  /manage/api/employee//update/:id - Updates the employee information 
