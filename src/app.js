const express = require('express');
const app = express();

require('./db/conn');
const Student = require('./models/student');
const studentRouter = require('./routers/studnets');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(studentRouter);



app.listen(port,() =>{
    console.log(`connection is setup at ${port}`);
});

