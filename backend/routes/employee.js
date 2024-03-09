
const express = require("express");
const employeeRouter= express.Router();
const jwt=require("jsonwebtoken");
const zod = require("zod");
const { Employee } = require("../database/db");
const { authentication } = require("../middleware/middleware");
const multer = require('multer');

const storage = multer.diskStorage({
    destination:"uploads",
    filename : (req,file,cb)=>{
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage }).single('image');

const employeeSchema= zod.object({
    empId: zod.string(),
    fullName : zod.string(),
    emailId : zod.string(),
    jobRole: zod.string()
}).strict();


employeeRouter.get("/checking",(req,res)=>{
    console.log("hello");
    res.json("Hello");
});

employeeRouter.get("/show",authentication,async (req,res)=>{
    const getAllUser= await Employee.find();
    res.json(getAllUser);
});

employeeRouter.post("/add",authentication,async (req,res)=>{
    upload(req,res,async (err)=>{
        if(err){
            console.log(err);
        }else{
            const data=req.body;
            const checking=employeeSchema.safeParse(data);
            if(!checking.success){
                return res.status(400).json({
                    message: "Incorrect inputs"
                })
            }
            console.log("Data post : ",data);

            const find= await Employee.findOne({
                empId:req.body.empId
            });
            if(find && find._id){
                console.log("checkin");
                return res.status(411).json({
                    message : "Employee Already Exists"
                });
            }
            const dataUpload= new Employee({
                empId:req.body.empId,
                fullName:req.body.fullName,
                emailId:req.body.emailId,
                jobRole:req.body.jobRole,
                image: {
                    data: req.file.filename,
                    contentType: "image/png"
                }
            });
            await dataUpload.save().then(()=> res.json({
                message: "Employee added successfully"
            })).catch(err =>{
                console.log(err);
                res.json({
                    message: "Error occurred while uploading"
                })
            });
        }
    });
});

employeeRouter.put("/update/:id",authentication,async (req,res)=>{
    upload(req,res,async (err)=>{
        if(err){
            console.log(err);
        }else{
            const data=req.body;
            console.log("Data put : ",data);
            console.log(req.params.id);
            const dataUpload= {
                empId:req.body.empId,
                fullName:req.body.fullName,
                emailId:req.body.emailId,
                jobRole:req.body.jobRole,
                image: {
                    data: req.file.filename,
                    contentType: "image/png"
                }
            };
            const find= await Employee.findOne({
                _id:req.params.id
            });
            console.log("Find : ",find);
            
            try{
                await Employee.updateOne(
                {
                    _id:req.params.id
                } , dataUpload);
            }catch(err){
                res.json({
                    message: "Error occured while updating employee details"
                })
            }
        }
    });
    res.json({
        message: "Employee updated successfully"
    });
});

employeeRouter.delete("/remove",authentication, async (req,res)=>{
    console.log(req.body.empId);
    const findUser=await Employee.findOne({
        empId:req.body.empId
    });
    if(!findUser){
        return res.json({
            message: "Employee not found !"
        });
    }
    const deleteEmployee=await Employee.deleteOne( { empId:req.body.empId } );
    res.json({
        message: "Employee Deleted Successfully",
        employee: findUser,
        deleteEmployee
    });
});

module.exports = {
    employeeRouter
};