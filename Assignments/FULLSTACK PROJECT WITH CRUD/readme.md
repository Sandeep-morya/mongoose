﻿FULLSTACK PROJECT WITH CRUD
In this particular problem statement you have to make a full fledged fullstack website. You can use anything for frontend be it React or plain HTML, CSS and JS. The goal is to learn frontend and backend in one go. You can be as creative as you want.
Navigation Bar

- This should contain following page links.
  -Home Page
  -About Page
  -Sign up Page
  -Login Page
- Also this navbar should be visible across all pages
  Home Page
- This should have a welcome note, this is the right time to practice your writing skills as well.
- You can be as creative as you want.
- For example you can use images or gifs.
  About Page
- This should contain all the details of your project.
- For example pages, features and packages used.
- It can even have screenshots of your project that you can showcase over here.
  Sign up Page
- There should be a registration form with following fields.
  -username ==> Input Field
  -email ==> Input Field
  -DOB ==> Input Field
  -Role ==> Dropdown Menu (Admin, Explorer)
  -location ==> Input Field
  -password ==> Input Field (Type: Password)
  -confirm password ==> Input Field (Type: Password)
- The user should be registered only if password and confirm password field contains the same string.
- These user detail should be registered in MongoDB Atlas.
  Login Page
- There should be a login form with following fields.
  -username
  -password
- The authentication while login should be done using a middleware.
- Once the authentication is done and user is able to login, it should take the user to the home page.
- The username of the user should be visible over the navigation bar, no matter the user is navigating to any page.
- A Logout button should also appear on navbar, if the user clicks on it, he/she should log out and the username form the navbar should disappear.
  Routes
- POST for posting the user detail while registration.
- GET for getting all the users details
- GET for getting the detail of a particular user.
- PATCH/PUT for updating the user details. ==> Only Admin can do this.
- DELETE for deleting a particular user detail ==> Only Admin can do this.
  Middlewares
- Authenticator ==> Which will authenticate the user while login and allow the user to login.
- validator ==> Which will validate the role of user while updating or deleting.
- userLogger ==> This will log the username of the user along with the user's role once they login into a log.txt file.
  Note
  Use MongoDB atlas to carryout all the database related stuff.
