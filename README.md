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
$ cd ireporter
User@guest MINGW64 ~/iReporter
$ npm install
```

Use `npm start` to start the iReporter app
```
e.g
User@guest MINGW64 ~/iReporter
$ npm start
```

### IMPLEMENTED API ENDPOINTS

<table>
<tr><th>HTTP VERBS</th><th>API ENDPOINTS</th><th>CORRESPONDING EFFECTS</th></tr>
<tr><td>POST</td> <td>/api/v1/auth/signup</td>  <td>Signup user</td></tr>
<tr><td>POST</td> <td>/api/v1/auth/login</td>  <td>Signin user</td></tr>
<tr><td>POST</td> <td>/api/v1/red-flags</td>  <td>Send a redflag</td></tr>
<tr><td>POST</td> <td>/api/v1/interventions</td>  <td>Send an intervention</td></tr>
<tr><td>GET</td> <td>/api/v1/red-flags</td>  <td>Fetch all users redflags records</td></tr>
<tr><td>GET</td> <td>/api/v1/interventions</td>  <td>Fetch all users interventions records</td></tr>
<tr><td>GET</td> <td>/api/v1/red-flags/:id</td>  <td>Fetch specific redflag of any user</td></tr>
<tr><td>GET</td> <td>/api/v1/interventions/:id</td>  <td>Fetch a specific intervention of any user</td></tr>
<tr><td>GET</td> <td>/api/v1/profile/red-flags</td>  <td>Fetch specific users redflag records</td></tr>
<tr><td>GET</td> <td>/api/v1/profile/interventions</td>  <td>Fetch specific users intervention records</td></tr>
<tr><td>GET</td> <td>/api/v1/red-flags/profile/status</td>  <td>Fetch redflags status count</td></tr>
<tr><td>GET</td> <td>/api/v1/interventions/profile/status</td>  <td>Fetch interventions status count</td></tr>
<tr><td>PATCH</td> <td>/api/v1/red-flags/:id/location</td>  <td>Update redflags location</td></tr>
<tr><td>PATCH</td> <td>/api/v1/interventions/:id/location</td>  <td>Update interventions location</td></tr>
<tr><td>PATCH</td> <td>/api/v1/red-flags/:id/comment</td>  <td>Update redflags comment</td></tr>
<tr><td>PATCH</td> <td>/api/v1/intervention/:id/location</td>  <td>Update interventions comment</td></tr>
<tr><td>PATCH</td> <td>/api/v1/red-flags/:id/status</td>  <td>Update redflags status</td></tr>
<tr><td>PATCH</td> <td>/api/v1/interventions/:id/status</td>  <td>Update interventions status</td></tr>
<tr><td>PATCH</td> <td>/api/v1/users/profile-image</td>  <td>Update profile image</td></tr>
<tr><td>DELETE</td> <td>/api/v1/red-flags/:id</td>  <td>Delete a redflag record</td></tr>
<tr><td>DELETE</td> <td>/api/v1/interventions/:id</td>  <td>Delete an intervention record</td></tr>
</table>

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

## API Documentation
* [DOCUMENTATION](https://eye-reporter.herokuapp.com/api-documentation)- API DOCUMENTATION

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
