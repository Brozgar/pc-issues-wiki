# PC issues wiki

> A very simple project that was done as a test task from an employer. Time was of the essence, so I did only the basic architecture with minimum functionality to provide mvp.

## Build Setup

You need to run these commands both in ```./server``` and in ```./public```
``` bash
# start mongo docker container
docker-compose up -d

# install dependencies for both 
yarn install

# serve with hot reload at localhost:8080
yarn run startBackend # for server
yarn run startFrontend # for public
```

Note that unit testing wasn't implemented to save time as it's not required by the task. However the basic setup is there in case I would add it later just for fun.

## Task description

Create a web application that allows its users to find solutions to PC problems. The user is able to input a phrase describing the problem and view the potential solutions.

Example:

- problem desc: "no sound"
- possible solutions: [ "Make sure your computer isn't muted", "Check if the speakers and headphones cables are connected properly" ]

The application must include:

●	DB that stores data about PC problems and solutions
●	Node API server processing the received text and searching the DB for the matching data 
●	Front-End part implemented as a React or Vue app. It should have at least an interface for user input and viewing the results provided by the API

Feel free to spend as much or as little time as you'd like, as long as the previous have been met. Make the UI as nice and user-friendly as you want and the matching algorithm as accurate as you want.

Sample data for the DB provided in sample-data.json file.

## Comments on the project

I tried to finish the task as fast as possible, which took me around 6 hours. That was my first Vue app, so it took some researching. Also it would take me less if I wouldn't use Windows as an OS due to some OS related issues I came across.

I kept the original data structure from the provided JSON for the database, but I would change it, making each issue type a separate mongo document.

There's close to none data manipulation in this project, so I decided to go with Vue, I would choose React otherwise.

Once you start the server app it will automatically populate the DB with a collection and a single document that is used for this task. It is taken from "stubs" folder under server directory. I added an issue with a symptom "desktop computer or laptop won't turn on" to the Windows type to demonstrate how it would show results from multiple types, so feel free to search for it.
