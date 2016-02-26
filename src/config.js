<<<<<<< HEAD
var serverHost = 'localhost';
var serverPort = 8001;
var clientHost = 'localhost';
var clientPort = 3000;
=======
const serverHost = 'localhost'
const serverPort = 8001
const clientHost = 'localhost'
const clientPort = 3000
const BASE_API_URL = `http://${serverHost}:${serverPort}/api/`
const LOCALSTORAGE_KEY = 'token'
const APP_NAME = 'baseapp/'
>>>>>>> 568f86ffb35292286f82729c64c6075f78dcbe30

module.exports = {
  serverHost,
  serverPort,
  clientHost,
  clientPort,
<<<<<<< HEAD
  api: `http://${serverHost}:${serverPort}/api/`
=======
  BASE_API_URL,
  LOCALSTORAGE_KEY,
  APP_NAME
>>>>>>> 568f86ffb35292286f82729c64c6075f78dcbe30
}
