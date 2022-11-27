const jwt_controller = require("./jwt.controller");
const mongoose = require("mongoose");
const billingAppDataController = require("./billingApp.data.controller");

exports.validateUser = ((req,res) => {
    var userData = billingAppDataController.checkExistingUser(req);
    
    userData.then((data,err)=>{
        if(data.userName != null) res.status(200).json(data);
        else res.status(401).json("User not Authorized");
      });
    
});

exports.fetchPolicyDetails =async (req, res)=>{
    let isNotAuthorized = false;
    var policyData = {};
    var response = {};
    var tokenData = {};
   
    try{
        if(req.body.token ||req.headers.token ){
            let token = req.body.token ||req.headers.token;
            tokenData = jwt_controller.validateToken(token);
            if(tokenData.userName){
              policyData = await this.getPolicyDetailFromDb(tokenData);  
             response.policyData = policyData;           
                             
            }
            else isNotAuthorized = true;
        
        }  
        else isNotAuthorized = true;
    }
    catch(err) {
     isNotAuthorized = true;
     
    }    
   
  if (isNotAuthorized) res.status(401).json("not authorized");
  else res.status(200).json(response);
  };

  exports.getPolicyDetailFromDb = async (userData) => {
    let policyDetails = {};
    
    const users = await billingAppDataController.getUserDetailsById(userData.userId);
    if(users && users.userID && users.userType == "AGENT"){
       policyDetails = await billingAppDataController.getPolicyDetailsByAgentId(users._id);
    }
    return policyDetails;
  };
    
   
 