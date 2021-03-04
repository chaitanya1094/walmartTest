const dao=async (req,res)=>{
 return req.headers.successcase?{"status":201,"sucess":true,"message":req.body} :{"status":500,"sucess":false,"message":"Internal server error"} 
}

module.exports={dao}