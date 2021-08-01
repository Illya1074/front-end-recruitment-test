// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
'use strict'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

class ValidationsController {
  
  async index ({ view, request, response}) {
   
    const orderSchema = schema.create({
        firstName: schema.string({}, [
          rules.regex(new RegExp('^[a-zA-Z]+$')),
          
        ]),
        lastName: schema.string({}, [
          rules.regex(new RegExp('^[a-zA-Z]+$')),
          
        ]),
        email: schema.string({}, [
          rules.email(),
        ]),
        country: schema.string(),
        postalCode: schema.string({}, [
          rules.regex(new RegExp('^[0-9]{5}$')),
        ]),
        phone: schema.string({}, [
          rules.regex(new RegExp('^([(][0-9]{3}[)][ ]?[0-9]{3}-[0-9]{2}-[0-9]{2}|[0-9]{9,11}|[+][0-9]{2}[-][0-9]{3}[-][0-9]{3}[-][0-9]{3})$')),
          // (XXX)XXX-XX-XX | (XXX) XXX-XX-XX
          // XXXXXXXXX | XXXXXXXXXX | XXXXXXXXXXX
          // +XX-XXX-XXX-XXX 
        ]),
        creditCard: schema.string({}, [
          rules.regex(new RegExp('^([0-9]{16}|[0-9]{4}[-][0-9]{4}[-][0-9]{4}[-][0-9]{4})$')),
        ]),
        CVV: schema.string({}, [
          rules.regex(new RegExp('^[0-9]{3}$')),
        ]),
        expDate: schema.string({}, [
          rules.regex(new RegExp('^[0-9]{2}\/[0-9]{2}$')),
        ]),
    })
    
    
    try {
      
      await request.validate({ schema: orderSchema })

      response.send({
            message: 'Validation sucessed',
      })
    //   return view.render('confirmed')

    } catch(error) {
      // let arr = []
      response.badRequest(error.messages)

    }
    



   
    // response.send('hello')
  }

}

module.exports = ValidationsController