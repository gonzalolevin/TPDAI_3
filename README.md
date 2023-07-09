# Trabajo práctico de Personas y Peliculas
## This project relates a table of Movies to its related Characters, allowing the users to interact with all the information that it provides.
1. [ General Information ](#desc)
2. [ Installation and running ](#installation)
3. [ Usage ](#usage)
4. [ Credits ](#credits)
***
<a name="desc"></a>
# General Information
### What is the purpose of the project?
This project was carried out within the framework of a school subject called "Development of information systems", in order for us to learn the process of developing an API, and using the Node.js and Express technologies.
### What does the project do?
This project exposes the information of many movies and their related characters, giving the user the opportunity to interact with this information in many ways, such as:
- Getting an array with all the Movies/Characters and their related information.
- Getting the information of a specific movie/character by its ID.
- Posting a new movie/character to the database.
- Updating an already existing movie/character to the database.
- Deleting a movie/character from the database.
- Filtering through all of the movies/characters to find the ones mathing with your specifications.
### What technologies are used?
The technologies used were mainly Node.js and Express.
Node.js provides a powerful environment for building APIs, it offers several features that make it an excellent choice for API development.
Express provides a minimalist framework for building APIs, making API development more straightforward with its features.
***
<a name="installation"></a>
# Installation and running
### Clone the repository.
- Open a code editor of your choice.
- Open the terminal and type in "git clone https://github.com/gonzalolevin/TPDAI_3.git", in order to clone the whole project to a folder in your computer.
- Open the folder TPDAI_3 in the code editor.
### Install the dependencies.
- Type in the following line in the terminal "npm i", this will re-install to your computer all the dependencies that the project needs, such as the following:
  - express
  - dotenv
  - mssql
  - passport
  - swagger-jsdoc
- Go to the .env file and change the DB_SERVER to your devices's name.
### Open the database.
- Open the SQL Server Management Studio.
- Open the file called Disney.sql and Execute it. (This will load the database)
### Run the project
Type in the terminal "npm start" in order to execute the code.

<a name="usage"></a>
# Usage
The project has many functionalities that can be tried out by the user.
The best way to try said functinalities is by using the Postamn application, which is a popular API development tool that enables developers to streamline the process of testing, documenting, and interacting with APIs.
### Postman Usage
- Open the postman application.
- Press the "New" button. <img width="278" alt="postman new" src="https://github.com/gonzalolevin/TPDAI_3/assets/90118986/fb4aafea-d026-4591-814c-007ae5b8a4fb">
- Press on "HTTP" button.  <img width="386" alt="postman http" src="https://github.com/gonzalolevin/TPDAI_3/assets/90118986/a43bc9e1-3eab-4844-8529-6d0795b0c7e0">
- Now you can try all the endpoint that the project provides.
### Differentiation between movies and characters
This projects consists of two different routes, one being movies and the other one being characters, each of them have their own endpoint, so the URL will differ one from another.
#### While trying the characters endpoint
You will use the following URL: localhost:3000/characters/
#### While trying the movies endpoint
You will use the following URL: localhost:3000/movies/

## Authentification
You will need to use the bearer token authentification in order to try the endpoint.
- Type in the following URL: localhost:3000/auth/login
- Go to the Authorization part.
- Select the Type "Bearer Token".
- Insert the token recieved.

## Using each endpoint

You will appreciate that many endpoints can be tried out:

![Options](https://github.com/gonzalolevin/TPDAI_3/assets/90118986/ab643f7b-3352-4897-9353-e31676cecca7)

* If you want to receive all the information from the characters or movies, select the GET option, and type the URL corresponding to your search, being characters or movies.

![GET](https://github.com/gonzalolevin/TPDAI_3/assets/90118986/b7a3be35-7a8b-496e-aaa7-1883ea6b859d)

* If you want to receive the information from a specific character or movie by its ID, select the GET option, type the URL corresponding to your search, and after the bar type the ID that you are referring to.

![GetID](https://github.com/gonzalolevin/TPDAI_3/assets/90118986/4acae2ee-b246-4948-bc0a-9da823671dc3)

* If you want to post a new character or movie to the database, select the POST option, type the corresponding URL to your search, and follow the next steps:
  - Select "Body".
  - Change the specifications to "raw".
  - Change the configuration to "JSON".
  - Type in all the information for the new character or movie.

![POST](https://github.com/gonzalolevin/TPDAI_3/assets/90118986/c8af399b-3bfa-42ba-8141-97c320c6be68)

* If you want to update the information of an already existing character or movie, select the PUT option, type the corresponding URL to your search, and do all the same steps as the POST procedure. However, this time, you have to include the ID of the character or movie you are updating.

![PUT](https://github.com/gonzalolevin/TPDAI_3/assets/90118986/1ccf05d3-81f8-49fe-add3-bb290fd683fc)

* If you want to delete an already existing character or movie from the database, select the DELETE option, type the URL to your search, and include the ID of the character or movie you want to delete next to the final bar.

![DELETE](https://github.com/gonzalolevin/TPDAI_3/assets/90118986/6266f8c4-7f51-4a9b-af5d-0baa68bcefd2)

<a name="credits"></a>
# Credits
The project was carried out by two very respected programmers:
- Uriel Strauss (uristrauss)
- Gonzalo Levin (gonzilevin)
