const Joi = require('joi');

const models = require('../../models');

function validation_schema(){
    const schema = Joi.object().keys({
    name: Joi.string()
    .regex(/^[a-zA-Z ]*$/)
    .required()
    });

    return schema;
}

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

    schema = validation_schema();

    const {value, error} = Joi.validate(ctx.request.body.team, schema);

    if (error && error.details) {
      ctx.status=404;
      ctx.message="Invalid Input or bad request";
      ctx.body={
        error
      }
    }
    else{
    const id = ctx.params.id
    let team = await models.Team.findOne({where: { id }})
    team = await team.update(ctx.request.body.team)
    ctx.body = {
      team
    }
    ctx.status=200;
    ctx.message="Successfully Updated, id: " + id;
    await next();
  }
};

exports.create_team = async (ctx, next) => {
    schema = validation_schema();

    const {value, error} = Joi.validate(ctx.request.body.team, schema);

    if (error && error.details) {
      ctx.status=404;
      ctx.message="Invalid Input or bad request";
      ctx.body={
        error
      }
    }
    else{
      const team = await models.Team.create(ctx.request.body.team)
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