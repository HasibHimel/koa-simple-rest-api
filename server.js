const Koa = require('koa');
const mount = require('koa-mount');

const logger =  require('./src/logger');
const team_router = require('./api/routes/team');

server = new Koa();

server.use(team_router.routes()).use(team_router.allowedMethods());
server.use(mount('/teams', server));

server.listen(3000, () => logger.info("server running"));