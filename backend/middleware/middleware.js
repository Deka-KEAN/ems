const zod = require("zod");
const jwt=require("jsonwebtoken");

const authentication = (req,res,next) =>{
    next();
}

module.exports = {
    authentication
}