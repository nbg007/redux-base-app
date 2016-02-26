var serverHost = 'localhost';     
var serverPort = 8001;      
var clientHost = 'localhost';     
var clientPort = 3000;      
        
module.exports = {     
  serverHost,       
  serverPort,       
  clientHost,       
  clientPort,
  api: `http://${serverHost}:${serverPort}/api/`
}