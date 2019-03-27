const models = require('../../models');
const validation = require('../validation/team');
const logger = require('../../src/logger')

exports.get_all_Teams = async (ctx, next) => {
  try{
    var teams = await models.Team.findAll()
  }catch(err){
    throw new Error(err.message);
  }

  ctx.body = { teams }
  ctx.status=200;
  ctx.message="Successful";
  await next();
};

exports.get_team_by_id = async (ctx, next) => {
  const id = ctx.params.id

  try{
    var team = await models.Team.findOne({where: { id }})
  }catch(err){
    throw new Error(err.message);
  }
  
  ctx.body = { team }
  ctx.status=200;
  ctx.message="Succesfull(team id: " + id + ")";
  await next();
  
};

exports.update_team_by_id = async (ctx, next) => {
    const ctx_body = ctx.request.body.team;

    const error = validation.produce_error(ctx_body);

    if (error) {
      validation.set_ctx_for_error(ctx, error);
    }
    else{
      const id = ctx.params.id

      try{
        var team = await models.Team.findOne({where: { id }});
        team = await team.update(ctx_body);
      }catch(err){
        throw new Error(err.message);
      }

      ctx.body = { team }
      ctx.status=200;
      ctx.message="Successfully Updated, id: " + id;
      await next();
}
};

exports.create_team = async (ctx, next) => {
    const ctx_body = ctx.request.body.team;
    const error = validation.produce_error(ctx_body);

    if (error) {
      validation.set_ctx_for_error(ctx, error);
    }
    else{

      try{
        var team = await models.Team.create(ctx_body)
      }catch(err){
        throw new Error(err.message);
      }

      ctx.body = { team }
      ctx.status=201;
      ctx.message="Successfully Created";
      await next();
    }
};
exports.delete_team_by_id = async (ctx, next) => {
    const id = ctx.params.id

    try{
      var team = await models.Team.findOne({where: { id }})
      team = await team.destroy()
    }catch(err){
      throw new Error(err.message);
    }

    ctx.body = { team }
    ctx.status=204;
    ctx.message="Successfully deleted, id: " + id;
    await next();
};