const models = require('../../models');
const validation = require('../validation/team');

exports.get_all_Teams = async (ctx, next) => {
    const teams = await models.Team.findAll()
    ctx.body = {
      teams
    }
    ctx.status=200;
    ctx.message="All teams";
    await next();
};

exports.get_team_by_id = async (ctx, next) => {
    const id = ctx.params.id
    const team = await models.Team.findOne({where: { id }})
    ctx.body = {
      team
    }
    ctx.status=200;
    ctx.message="team id: " + id;
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
    let team = await models.Team.findOne({where: { id }});
    team = await team.update(ctx_body);
    ctx.body = {
      team
    }
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
      const team = await models.Team.create(ctx_body)
      ctx.body = {
        team
      }
      ctx.status=200;
      ctx.message="Successfully Created";
      await next();
    }
};
exports.delete_team_by_id = async (ctx, next) => {
    const id = ctx.params.id
    let team = await models.Team.findOne({where: { id }})
    team = await team.destroy()
    ctx.body = {
      team
    }
    ctx.status=200;
    ctx.message="Successfully deleted, id: " + id;
    await next();
};