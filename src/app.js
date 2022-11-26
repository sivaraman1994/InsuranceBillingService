const express = require('express'),
      path    = require('path'),
      mongoose = require('mongoose'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      dbConfig = require('./db/db'),
      createError = require('http-errors');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.db,{useNewUrlParser:true}).then(() => {
    console.log("database connect successfully.")},
    (err)=>{
        console.log("DB connection ERR:"+err)} 
    )

 const registeredUserRoute = require('./routes/registereduser.route')
 const policyDetailRoute = require('./routes/policydetail.route')
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:false}))
 app.use(cors())
 app.use('/register-api',registeredUserRoute)
 app.use('/policydetail-api',policyDetailRoute)
 

app.get('/hello', (req, res)=>{
    res.set('Content-Type', 'text/html');
    res.status(200).send("<h1>Hello GFG Learner!</h1>");
});
  
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