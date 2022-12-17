import Joi from '@hapi/joi'

const schema = Joi.object({
  order_statues: Joi.string().valid('active', 'complete').required(),
  products: Joi.array().items(
    Joi.object({
        id: Joi.number().required(),
      quantity: Joi.number().required().min(1).max(1000)
    })
  )
})

export default schema
