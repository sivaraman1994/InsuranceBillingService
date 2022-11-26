const express = require('express');
const registeredUserRoute = express.Router();

let RegisteredUser = require("../model/RegisteredUser");

registeredUserRoute.route("/get-users").get((req,res) => {
    RegisteredUser.find((err,data) =>{
        if(err)
          return next(err)
        else
          res.json(data)
          
    }) 
})

  module.exports = registeredUserRoute
