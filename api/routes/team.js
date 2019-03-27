const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const koa_req_logger = require('koa-logger');
const mount = require('koa-mount');


const teamController = require('../controllers/team');

const server = new Koa();
const router = new Router();


router.get('/', teamController.get_all_Teams);

router.get('/:id', teamController.get_team_by_id);
  
router.put('/:id', bodyParser, teamController.update_team_by_id);
  
router.post('/', bodyParser, teamController.create_team);
  
router.del('/:id', bodyParser, teamController.delete_team_by_id);

module.exports = router;