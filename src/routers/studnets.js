const express = require('express');
const router = new express.Router;
const Student = require('../models/student');
module.exports = router;


// router.post('/students',(req,res)=>{
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then( ()=>{
//         res.status(201).send(user);
//     }).catch( (err) =>{
//         res.status(400).send(err);  
//     });

//     res.send("Hello from student side.")
// });


// Add student 
router.post('/students',async(req,res)=>{
        try{
            const user = new Student(req.body);
            const addStudent = await user.save();
            res.status(201).send(addStudent);
        }catch(err){
            res.status(400).send(err);
        }
    });

// Get Student

router.get('/students',async(req,res) =>{

        try{
         const studentsData =await Student.find();
         res.send(studentsData);
        }catch(err){
            res.send(err);
        }
    });

router.get('/students/:name',async(req,res)=>{
        try{
            const Name = req.params.name;
            // console.log(Name);
            const studentdata = await Student.findOne({name:Name});
            // console.log(studentdata);   
            if(!studentdata){
                return res.status(404).send();
            }else{
                res.status(200).send(studentdata);
            }
            
        }catch(err){
            res.status(500).send(err);
        }
        
    });

// Update Student

router.patch('/students/:name', async(req,res) =>{
       
        try{
            const Name = req.params.name;
            const updateStudent = await Student.findOneAndUpdate({name:Name},req.body,{
                new:true
            });
            res.status(200).send(updateStudent);
        }catch(err){
            res.status(404).send(err);
        }
    });

// delete Student

router.delete('/students/:id', async(req,res)=>{
        try{
            const _id = req.params.id;
            const deleteStudente = await Student.findByIdAndDelete(_id);
            if(!deleteStudente){
                res.status(404).send();
            }
            res.send(deleteStudente);
        }catch(err){
            res.status(500).send(err);
        }
    })
