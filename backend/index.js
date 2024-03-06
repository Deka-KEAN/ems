

const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
const { employeeApp } = require('./routes/employee');

const port= 3000 || process.env.port;

app.use(bodyParser.json());
app.use(cors());

app.use("/manage/api/",employees);

app.listen(port,()=>{
    console.log(`Listening on port ${port}!!`);
});

