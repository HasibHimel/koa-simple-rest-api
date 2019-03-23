const logger =  require('./logger');

const server = require('../api/team');

server.listen(3000, () => logger.info("server running"));