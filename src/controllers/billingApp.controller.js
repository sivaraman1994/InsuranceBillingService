const jwt_controller = require("./jwt.controller");
const mongoose = require("mongoose");
const billingAppDataController = require("./billingApp.data.controller");

exports.validateUser = async (req,res) => {
    var userData = await billingAppDataController.checkExistingUser(req);
    var isUserIdExists = await billingAppDataController.getUserDetailsById(req.body.userID);
    console.log("id present"+JSON.stringify(isUserIdExists));
    
   
    if(userData.userName != null) res.status(200).json(userData);
    
    else if (isUserIdExists && isUserIdExists.name != null){
      res.status(401).json("User not Authorized")
    }
    else res.status(401).json("User ID does not exist");
      
      
    
};
exports.registerUser = async(req,res) => {
  var userData = await billingAppDataController.getUserDetailsById(req.body.userID);
  if(userData && userData.userID !=null){
    res.status(401).json("User already exist");
  }
  else{
    userData = req.body;
    userData.userType = "REGULAR";
    billingAppDataController.insertUserInfo(userData);
    res.status(200).json("User created succesfully");
  }
}
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
    let policyReturnDetails = {};
    const user = await billingAppDataController.getUserDetailsById(userData.userId);
    if(user && user.userID && user.userType == "AGENT"){
       policyDetails = await billingAppDataController.getPolicyDetailsByAgentId(user._id);
       policyDetails.forEach(async (element) => {
         let userObj = await billingAppDataController.getUserDetailsByName(element.userID);
          policyDetails.userName = userObj.name
          console.log(policyDetails.userName)
       })
    }
       return policyDetails;
  };
  