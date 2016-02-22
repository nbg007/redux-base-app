const serverHost = 'localhost'
const serverPort = 8001
const clientHost = 'localhost'
const clientPort = 3000
const BASE_API_URL = `http://${serverHost}:${serverPort}/api/`
const LOCALSTORAGE_KEY = 'token'
const APP_NAME = 'baseapp/'

module.exports = {
  serverHost,
  serverPort,
  clientHost,
  clientPort,
  BASE_API_URL,
  LOCALSTORAGE_KEY,
  APP_NAME
}