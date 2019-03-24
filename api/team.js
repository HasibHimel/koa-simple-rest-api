const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const koa_req_logger = require('koa-logger')

const logger = require('../src/logger');
const models = require('../models');

const server = new Koa();
const router = new Router();

router.get('/', async ctx => {

    //logger.info('GET (all teams)');
    const teams = await models.Team.findAll()
    ctx.body = {
      teams
    }
});
  
router.get('/:id', async ctx => {
    //logger.info('GET (team by id)');
    const id = ctx.params.id
    const team = await models.Team.findOne({where: { id }})
    ctx.body = {
      team
    }
});
  
router.put('/:id', bodyParser, async ctx => {
    //logger.info('PUT (update by id)');
    const id = ctx.params.id
    let team = await models.Team.findOne({where: { id }})
    team = await team.update(ctx.request.body.team)
    ctx.body = {
      team
    }
});
  
router.post('/', bodyParser, async ctx => {
    //logger.info('POST (Create new team)');
    const team = await models.Team.create(ctx.request.body.team)
    ctx.body = {
      team
    }
});
  
router.del('/:id', bodyParser, async ctx => {
    //logger.info('DELETE (Delete team by id)');
    const id = ctx.params.id
    let team = await models.Team.findOne({where: { id }})
    team = await team.destroy()
    ctx.body = {
      team
    }
});

server.use(koa_req_logger());
server.use(router.routes());

module.exports = server;
