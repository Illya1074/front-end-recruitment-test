// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
'use strict'

class BaconsController {
  
  set ({view, session}) {
    console.log('index')
    
    session.put('count', [...session.get('count'),1])
    console.log(session.get('count'))

    const obj = {
      val: session.get('count')
    }
    return view.render('bacon', {obj})
    // response.send('hello')
  }

  get({view, session}){
    console.log('getpost')    
    
    session.put('count', [1])
    
    const obj = {
      val: session.get('count')
    }

    console.log(session.get('count'))

    return view.render('bacon', { obj })
  }
}

module.exports = BaconsController