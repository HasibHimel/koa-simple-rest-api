const Koa = require('koa');
//const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-body')();


const models = require('../models');

const server = new Koa();
const router = new Router();

router.get('/teams', async ctx => {
    const teams = await models.Team.findAll()
    ctx.body = {
      teams
    }
  });
  
  router.get('/teams/:id', async ctx => {
    const team = await models.Team.findOne({where: { id: ctx.params.id }})
    ctx.body = {
      team
    }
  })
  
  router.put('/teams/:id', bodyParser, async ctx => {
    let team = await models.Team.findOne({where: { id: ctx.params.id }})
    team = await team.update(ctx.request.body.team)
    ctx.body = {
      team
    }
  },)
  
  router.post('/teams', bodyParser, async ctx => {
    const team = await models.Team.create(ctx.request.body.team)
    ctx.body = {
      team
    }
  })
  
  router.del('/teams/:id', bodyParser, async ctx => {
    let team = await models.Team.findOne({where: { id: ctx.params.id }})
    team = await team.destroy()
    ctx.body = {
      team
    }
  })

server.use(router.routes());

module.exports = server;
