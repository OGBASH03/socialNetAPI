
# SOCIAL NETWORK API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Content
- [Project descrition](#Description)
- [CRITERIA](#CRITERIA)
- [Contributing](#Contributing)
- [Installation](#Installation)
- [Questions](#Questions)
- [License](#License)

## Title
SOCIAL NETWORK API

## Description
This is a social network API that allows users to create, read, update, and delete users, thoughts, reactions to thoughts, and friends. Upon starting the application, the server is initiated, and Mongoose models are synced to a MongoDB database. Using GET routes in Insomnia, users can view data for users and thoughts in a formatted JSON. API POST, PUT, and DELETE routes can be tested in Insomnia to create, update, and delete users and thoughts in the database. Additionally, reactions to thoughts can be created and deleted, and friends can be added and removed from a user’s friend list through the use of API POST and DELETE routes.

## CRITERIA

GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Installation
Clone the project repository from GitHub or download the source code.
Open a terminal window and navigate to the project directory.
Install Node.js on your system if it's not already installed. You can download it from the official Node.js website.
Install MongoDB on your system if it's not already installed. You can download it from the official MongoDB website.
Install the project dependencies by running npm install in the terminal.
Create a .env file in the root directory of the project and set the MONGODB_URI variable to the URI of your MongoDB database.
Start the server by running npm start in the terminal.
Use a tool like Insomnia to test the API endpoints, such as the GET, POST, PUT, and DELETE routes for users, thoughts, reactions, and friends.

## Contribution
No thank you not accepting contrubutions at the moment.


## Questions
 
https://github.com/OGBASH03

## License
Licensed under the [MIT](https://opensource.org/licenses/MIT) license
    