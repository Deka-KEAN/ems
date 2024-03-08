
const express = require("express");
const employeeRouter= express.Router();
const jwt=require("jsonwebtoken");
const zod = require("zod");
const { Employee } = require("../database/db");
const { authentication } = require("../middleware/middleware");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const employeeSchema= zod.object({
    empId: zod.string(),
    firstName : zod.string(),
    emailId : zod.string(),
    jobRole: zod.string()
});
const signinSchema= zod.object({
    username: zod.string(),
    firstName : zod.string(),
});


employeeRouter.get("/checking",(req,res)=>{
    console.log("hello");
    res.json("Hello");
});

employeeRouter.get("/show",authentication,async (req,res)=>{
    const getAllUser= await Employee.find();
    res.json(getAllUser);
});

employeeRouter.post("/add", authentication,async (req,res)=>{
    const data=req.body;
    // console.log(data);
    const checking=employeeSchema.safeParse(data);
    if(!checking){
        console.log(checking);
        return res.status(400).json({
            message : "Incorrect inputs"
        })
    }
    const empId=req.body.empId;
    const fullName=req.body.fullName;
    const emailId=req.body.emailId;
    const jobRole=req.body.jobRole;
    const image= req.body.img || "no image";
    console.log(image);
    const find= await Employee.findOne({
        empId
    });
    if(find && find._id){
        console.log("checkin");
        return res.status(411).json({
            message : "Employee Already Exists"
        });
    }

    const createdUser=await Employee.create({
        empId,
        fullName,
        emailId,
        jobRole,
        image
    });
    // res.json(createdUser);
    res.json({
        message: "Employee added successfully"
    });
});

employeeRouter.put("/update", authentication, upload.single('file'), async (req,res)=>{
    // const data=req.body;
    // const success=employeeSchema.safeParse(data);
    // if(!success){
    //     return res.status(400).json({
    //         message: "Incorrect inputs"
    //     })
    // }
    // const empId=req.body.empId;
    // const fullName=req.body.fullName;
    // const emailId=req.body.emailId;
    // const jobRole=req.body.jobRole;
    console.log(req.body);
    
    const {empId,fullName,emailId,jobRole} = req.body;
    const file = req.file;
    console.log(empId);
    try {
        console.log("hello",req.file);
        const findUser=await Employee.findOne({empId});
        const imageBuffer = Buffer.from(req.body.image, 'base64');
        console.log(imageBuffer);
        const newData = {
            empId,
            fullName,
            emailId,
            jobRole,
            image: imageBuffer.toString('base64')
        };
        await Employee.updateOne(
        {
            _id:req.body._id
        },newData);
        res.json({
            message: "Employee Updated Successfully!"
        });
    }
    // if(findUser._id){
    //     const userId=findUser._id;
    //     const token=jwt.sign({
    //         userId
    //     },JWT_SECRET);
    //     return res.json({
    //         token : token
    //     });
    // }
    catch(err){
        console.log(err);
        res.status(411).json({
            message: "Error while logging in"
        });
    }
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