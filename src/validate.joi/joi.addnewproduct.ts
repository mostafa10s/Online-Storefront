import Joi from '@hapi/joi'

const schema_addnewprodct = Joi.object({
  product_id: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required()
})

export default schema_addnewprodct
