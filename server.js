const Koa = require('koa');
const mount = require('koa-mount');

const logger =  require('./src/logger');
const server = require('./api/team');

const app = new Koa();

app.use(mount('/teams', server));

app.listen(3000, () => logger.info("server running"));