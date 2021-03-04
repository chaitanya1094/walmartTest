const products=require('../products')
const assert = require('chai').assert;
jest.mock('../productsDAO.js');
const requestForHeader = {
    headers: {
      //  'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVzZXIiLCJpYXQiOjE2MTQzNTA0MDJ9.ubuisgU9KeyKIHu6IdRDJixsxKQYWcfT7AJDEKvAqQo'  
    },
    body: { price: "1200", name: 'table' }
        
  }

  const requestForPriceCheck = {
    headers: {
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVzZXIiLCJpYXQiOjE2MTQzNTA0MDJ9.ubuisgU9KeyKIHu6IdRDJixsxKQYWcfT7AJDEKvAqQo',
        successcase:true  
    },
    body: { price: "1s200", name: 'table' }
        
  }

  const requestForSucess = {
    headers: {
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVzZXIiLCJpYXQiOjE2MTQzNTA0MDJ9.ubuisgU9KeyKIHu6IdRDJixsxKQYWcfT7AJDEKvAqQo',  
        successcase:true
      },
    body: { price: "1200", name: 'table' }
        
  }
  const requestForServerFail = {
    headers: {
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVzZXIiLCJpYXQiOjE2MTQzNTA0MDJ9.ubuisgU9KeyKIHu6IdRDJixsxKQYWcfT7AJDEKvAqQo',  
        successcase:false
      },
    body: { price: "1200", name: 'table' },
    
        
  }
  const response = {   
 }
 describe('Products insert methid', () => {

    test('should ask to provide token', async () => {
        return products.insertProducts(requestForHeader, response).then(result => {
            assert.deepEqual(result, {"status":401,"sucess":false,"message":"Please provide token"})
        })
    })
    test("should check for price to be integer", async () => {
        return products.insertProducts(requestForPriceCheck, response).then(result => {
         
            assert.deepEqual(result,  {"status":400,"sucess":false,"message":"Price should be integer"} )
        })
        
      });

  test("should give response with same object for sucessfully adition", async () => {
    return products.insertProducts(requestForSucess, response).then(result => {
        
        assert.deepEqual(result,{"status":201,"sucess":true,"message": { price: "1200", name: 'table' }} )
    })
  });
  test("should give response with internal Server on db fail", async () => {
    return products.insertProducts(requestForServerFail, response).then(result => {
      
        assert.deepEqual(result,{"status":500,"sucess":false,"message":"Internal server error"}  )
    })
  });
})