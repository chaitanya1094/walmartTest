
const  fs=require('fs');
const db=require('../dataFile.json')

const writeFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) reject(err)
      else resolve("inserted to file")
    })
  })

const dao=async (req,res)=>{

    db.push(req.body); 
    try{
        await writeFile("dataFile.json", JSON.stringify(db))
        return {"status":201,"sucess":true,"message":req.body} 
    }catch(err) {
        return {"status":500,"sucess":false,"message":"Internal server error"} 
    } 
}

module.exports={dao}