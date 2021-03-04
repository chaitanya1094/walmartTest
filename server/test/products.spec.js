const app = require("../app");
const request = require("supertest")(app);
const assert = require('chai').assert;
jest.mock('../productsDAO.js');

const productObj={
    "price":13323,
    "name":"Book"
}

describe("API Test Cases", function () {
    it("should have Autherization header", function(done) {
        request.post("/product")
        .send(productObj) 
        .expect(401)
        .end((err,res)=>{
          if(err) return done(err);
          assert.deepEqual(res.body, {"message": "Please provide token"});
          done();
        })
      });

      it("should check for price to be integer", function(done) {
        request.post("/product")
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVzZXIiLCJpYXQiOjE2MTQzNTA0MDJ9.ubuisgU9KeyKIHu6IdRDJixsxKQYWcfT7AJDEKvAqQo')
        .send({
                "price":"f123",
                "name":"Pens"
        }) 
        .expect(400)
        .end((err,res)=>{
          if(err) return done(err);
          assert.deepEqual(res.body, {"message": "Price should be integer"});
          done();
        })
      });

  it("should give response with same object for sucessfully adition", function(done) {
    request.post("/product")
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVzZXIiLCJpYXQiOjE2MTQzNTA0MDJ9.ubuisgU9KeyKIHu6IdRDJixsxKQYWcfT7AJDEKvAqQo')
    .set("successcase",true)
    .send(productObj) 
    .expect(201)
    .end((err,res)=>{
    // console.log(res.text);
      if(err) return done(err);
      assert.deepEqual(res.body,{
        "price":13323,
        "name":"Book"
       });
      done();
    })
  });
});