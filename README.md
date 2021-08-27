LHL Node Skeleton
=========

## Project Setup

The following steps are only for _one_ of the group members to perform.

1. Create your own copy of this repo using the `Use This Template` button, ideally using the name of your project. The repo should be marked Public
2. Verify that the skeleton code now shows up in your repo on GitHub, you should be automatically redirected
3. Clone your copy of the repo to your dev machine
4. Add your team members as collaborators to the project so that they can push to this repo
5. Let your team members know the repo URL so that they use the same repo (they should _not_ create a copy/fork of this repo since that will add additional workflow complexity to the project)


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Description
  A web app that allows users to collaboratively create maps which list multiple "points". For example: "Best Places to Eat Around Town" or "Locations of Movie Scenes".
  Users are able to view a list of available maps and create their own if they choose to do so.

## Screenshots
  !['Create new map page'](https://github.com/jon-choi/WikiMap/blob/master/docs/Create%20New%20Map.png?raw=true)

  !['User home page'](https://github.com/jon-choi/WikiMap/blob/master/docs/Home%20Screen.png?raw=true)

  !['Map with Markers'](https://github.com/jon-choi/WikiMap/blob/master/docs/Map%20with%20Markers.png?raw=true)

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Body-Parser
- Chalk
- Cookie-session
- dotenv
- EJS 
- Express
- Morgan
- Node-Sass-Middleware
- PG-Native
