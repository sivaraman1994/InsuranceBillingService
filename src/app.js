const express = require('express'),
      path    = require('path'),
      mongoose = require('mongoose'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      createError = require('http-errors');
const app = express();
const billingAppController = require("./controllers/billingApp.controller");
const PORT = process.env.PORT || 4020;

mongoose.Promise = global.Promise

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:false}))
 app.use(cors())
 

app.get('/hello', (req, res)=>{
    res.set('Content-Type', 'text/html');
    res.status(200).send("<h1>Hello !</h1>");
});
app.get('/fetchPolicyDetails',billingAppController.fetchPolicyDetails);
app.post('/validateUser',billingAppController.validateUser);
app.post('/registerUser',billingAppController.registerUser);
app.post('/updatePolicy',billingAppController.updatePolicy);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is  listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

app.use((req,res,next) =>
  {
    next(createError(404))
  })

app.use((err,req,res,next) => {
    console.error(err.message)
    if(!err.statusCode)
       err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})