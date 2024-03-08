



const mongoose = require('mongoose');
require('dotenv').config()
const {Schema} = mongoose;

const url= process.env.database_url;
mongoose.connect(url);


const UserSchema= new Schema({
    username : String,
    emailId : String,
    password : String
});



const EmployeeSchema= new Schema({
    empId : String,
    fullName : String,
    emailId : String,
    jobRole : String,
    image : String
});




const Employee= mongoose.model("Employees",EmployeeSchema);
const User= mongoose.model("User",UserSchema);
module.exports = {
    Employee,
    User
};
