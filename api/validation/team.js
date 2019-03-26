const Joi = require('joi');

exports.produce_error = (ctx_body_data) => {
    const schema = Joi.object().keys({
    name: Joi.string()
    .regex(/^[a-zA-Z ]*$/)
    .required()
    });

    const {value, error} = Joi.validate(ctx_body_data, schema);

    return error;
};

exports.set_ctx_for_error = (context, err) => {
  context.status=404;
  context.message="Invalid Input or bad request";
  context.body={
    err
  }
}