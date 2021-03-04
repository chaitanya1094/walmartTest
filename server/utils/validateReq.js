
const validateHeader=(req)=>{
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader) {
      return {"status":401,"sucess":false,"message":"Please provide token"}
    }else{
        return {"sucess":true};
    }
}

const validateBody=(req)=>{
    //console.log(req.body,!req.body,!req.body.price,isNaN(req.body.price))
    if(!req.body){    
        return   {"status":400,"sucess":false,"message":"Please provide request body"}
        }
        else if(!req.body.price){
         return {"status":400,"sucess":false,"message":"Please provide price property"} 
        }else if(isNaN(req.body.price)){
         return  {"status":400,"sucess":false,"message":"Price should be integer"} ;
        }else{
         return {"sucess":true}
        }
         
}

module.exports={validateBody,validateHeader}