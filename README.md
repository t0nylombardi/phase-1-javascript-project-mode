# FBI Wanted Apllication

## Description:

This application creates a user-friendly interface for displaying details about wanted persons. It fetches data from the FBI API [https://api.fbi.gov/wanted/v1/list](https://api.fbi.gov/wanted/v1/list) to populate a local database with information about wanted persons.
The apllication displays cards that include visual identification images, basic information like age and physical appearance, and additional context or descriptions. Users can perform actions such as updating or deleting the information on the wanted person.

## Installation

- Clone the repository from [https://github.com/t0nylombardi/phase-1-javascript-project-mode](https://github.com/t0nylombardi/phase-1-javascript-project-mode).
- Install [JSON-Server](https://www.npmjs.com/package/json-server)
- Run JSON-server
  ```shell
  json-server --watch src/db.json

## License:

This project is licensed under Learn.co Educational Content License. See the LICENSE file for details.
