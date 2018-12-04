[![Build Status](https://travis-ci.org/shaolinmkz/iReporter.svg?branch=develop)](https://travis-ci.org/shaolinmkz/iReporter) [![Maintainability](https://api.codeclimate.com/v1/badges/98f6a05084a6967f1857/maintainability)](https://codeclimate.com/github/shaolinmkz/iReporter/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/98f6a05084a6967f1857/test_coverage)](https://codeclimate.com/github/shaolinmkz/iReporter/test_coverage)

# iReporter
Corruption is a huge bane to Africa’s development. African countries must develop novel and localised solutions that will curb this menace, hence the birth of iReporter. iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.

### Prerequisites
* Have a text editor (vs-code, atom or sublime text) and
* Git-bash for windows
* Have a heroku account OR Postman

```
e.g
vs-code or sublime-text AND
Git Bash or CLI
```

### Installing

After cloning this repo, `cd` into it and on your command line run `npm install` to install the dependencies located in the `package.json` file.

```
e.g
User@guest MINGW64 ~
$ cd fast-food-fast
User@guest MINGW64 ~/iReporter
$ npm install
```

Use `npm start` to start the iReporter app
```
e.g
User@guest MINGW64 ~/iReporter
$ npm start
```
## _You can now test the API endpoints below via Postman_

## FOR TESTING PURPOSES
Create a new red-flag record
POST `host:port/api/v1/red-flags`

Fetch all red-flag records
GET `host:port/api/v1/red-flags`

Fetch a specific red-flag record
GET `host:port/api/v1/red-flags/<red-flag-id>`

Edit a specific red-flage record's location
PATCH `host:port/api/v1/red-flags/<red-flag-id>/location`

Edit a specific red-flag record's cmment
PATCH `host:port/api/v1/red-flags/<red-flag-id>/comment`

Delete a specific red-flag record
DELETE `host:port/api/v1/red-flags/<red-flag-id>`


## Running the tests
Use `npm test` to run test to see a tabulated test result coverage

```
e.g
User@guest MINGW64 ~/iReporter
$ npm test
```

## Deployment
You can host this application on any server that is compatible with Nodejs apps.
* [Currently hosted on Heroku](https://eye-reporter.herokuapp.com/)


## Built With
* [Javascript | NodeJs](https://nodejs.org/en/) - The web framework used
* [Node Package Manager](https://www.npmjs.com/) - Dependency Management
* [Mocha](https://mochajs.org/) - Testing framework
* [Chai](http://www.chaijs.com/) - Testing framework

## UI/UX Template

* [Template](https://shaolinmkz.github.io/iReporter/ui/) - HTML, CSS and Javascript

## Hosted server
* [iReporter](https://eye-reporter.herokuapp.com/)- API root => Welcome message

## Versioning
Git-Hub 

## Authors
* **Nwabuzor, Chukwuemeka Obiora** - *Initial work* - [Git-hub repo link](https://github.com/shaolinmkz/iReporter)

## Credits
[Andela Fellowship](https://andela.com/fellowship/)

## Acknowledgments
* I appreciate anyone who has impacted in these project. You are all awesome!!!
* Salute to all my Learning facilitators and team mates. Your're the real MVP!!!
* I appreciate my Dad and family members for their strong support. Your're truly exceptional!!!
