
const {validateBody,validateHeader}=require('./utils/validateReq')

const {dao}=require('./productsDAO')

const insertProducts =async function(req, res) {
    if ( !validateHeader(req).sucess){
      return validateHeader(req)
    }
    if(!validateBody(req).sucess){
      return validateBody(req)
    }
      return await dao(req,res)
  }
  module.exports={insertProducts}