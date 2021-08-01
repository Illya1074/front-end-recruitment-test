// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
'use strict'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

class CheckoutController {
  
  async index ({ request, response}) {
    
    console.log(request.body())

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

    const acceptableData = {
        postalCode: "00000",
        phone: "000000000",
        creditCard: "0000000000000000",
        CVV: "000",
        expDate: "12/12"
    }
    
    
    try {
      
      await request.validate({ schema: orderSchema })

      if(request.body().postalCode === acceptableData.postalCode &&
       request.body().phone === acceptableData.phone && 
       request.body().creditCard === acceptableData.creditCard && 
       request.body().CVV === acceptableData.CVV && 
       request.body().expDate === acceptableData.expDate){
        response.send({
            message: 'Order successfully placed.',
        })
      } else {
        response.send({
            message: 'Wrong data',
        })
      }

      
    //   return view.render('confirmed')

    } catch(error) {
      // let arr = []
      response.badRequest(error.messages)

    }
    



   
    // response.send('hello')
  }

}

module.exports = CheckoutController