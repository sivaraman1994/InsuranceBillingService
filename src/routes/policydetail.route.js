const express = require('express');
const policyDetailRoute = express.Router();

let PolicyDetail = require("../model/PolicyDetails");

policyDetailRoute.route("/get-policydetails").get((req,res) => {
    PolicyDetail.find((err,data) =>{
        if(err)
          return next(err)
        else
          res.json(data)
          
    }) 
})


  module.exports = policyDetailRoute
