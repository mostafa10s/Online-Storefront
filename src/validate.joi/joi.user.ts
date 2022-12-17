import Joi from '@hapi/joi'

const schema = Joi.object({
  user_name: Joi.string().min(3).required(),
  passworde: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  last_name: Joi.string().min(3).required(),
  first_name: Joi.string().min(3).required()
})

export default schema
