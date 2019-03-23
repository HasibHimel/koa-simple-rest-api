const winston =  require('winston');

const server = require("./api/team");

server.listen(3000, () => winston.info("server running"));