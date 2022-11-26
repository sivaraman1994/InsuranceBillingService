const jwt_controller = require("./jwt.controller");
const mongoose = require("mongoose");
const policyDtl_model = require("../models/policyData.model")

var policyDetailSchema = mongoose.model("policyDetails", policyDtl_model.getPolicyDetailSchema());


exports.fetchPolicyStatus = ((req, res)=>{
    try{
        console.log("token"+req.body.token);
        if(req.body.token){
            const validData = jwt_controller.validateToken(req.body.token);
            console.log("valid data"+JSON.stringify(validData));
            if(validData){
                var response = this.getPolicyStsFromDb(validData);
        
                response.then((data,err) =>{
                res.status(200).json(data)
                });
                next
            }
            else res.status(401).json("User not Authorized");
        
        }  
        else res.status(401).json("User not Authorized");
    }
    catch{}{
        res.status(401).json("User not Authorized");
    }
    
    
  });

  exports.getPolicyStsFromDb = async () => {
     let policyStatusDetails = {};
    
     const policySts =  await policyDetailSchema.findOne();
     return policyStatusDetails;
  };
    
   
 