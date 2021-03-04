const router = require('express').Router();
const {insertProducts}=require('./products')
router.post('/',async function(req,res){
 let rResult= await  insertProducts(req,res);
 let message=rResult.status===201?rResult.message:{"message":rResult.message}
 res.status(rResult.status).json(message)

});

module.exports = router;