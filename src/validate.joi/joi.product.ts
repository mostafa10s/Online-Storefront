import Joi from '@hapi/joi'

const schema = Joi.object({
  product_name: Joi.string().min(3).required(),
  product_price: Joi.number().min(3).required()
})

export default schema
