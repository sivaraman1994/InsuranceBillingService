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
  
exports.updatePolicy = async(req,res)=>{
  let isNotAuthorized = false;
  try{
    if(req.body.token ||req.headers.token ){
        let token = req.body.token ||req.headers.token;
        let policyData = req.body.policyData;
        tokenData = jwt_controller.validateToken(token);
        if(tokenData.userId){
          const users = await billingAppDataController.getUserDetailsById(tokenData.userId);
          console.log("get users: "+users);
          console.log("get policyData: "+JSON.stringify(policyData));
          if(users && users.userID && users.userType == "AGENT"){
            let result=  await billingAppDataController.updatePolicyDetailsByPolicyId(policyData); 
            console.log(JSON.stringify(result));       
          }                
        }
        else isNotAuthorized = true;
    
    }  
    else isNotAuthorized = true;
}
catch(err) {
 isNotAuthorized = true;
 
} 
isNotAuthorized ?  res.status(401).json("not authorized"): res.status(200).json("policy details updated");

}
exports.addPolicy = async(req,res)=>{
  let isNotAuthorized = false;
  policyData = {};
  try{
    if(req.body.token ||req.headers.token ){
        let token = req.body.token ||req.headers.token;
        let policyData = req.body.policyData;  //is from json
        tokenData = jwt_controller.validateToken(token);
        // console.log("token verification:"+tokenData)
        if(tokenData.userId){
          const users = await billingAppDataController.getUserDetailsById(tokenData.userId);
          console.log("get policyData: "+policyData);    //get user from users collection
          if(users && users.userID && users.userType == "AGENT"){
             let policyUser = await billingAppDataController.getUserDetailsBYEmail(policyData.userEmail);
             console.log("what are we getting"+policyUser);
              if(Boolean(policyUser)){
                policyData.userID = policyUser._id;
                let result=  await billingAppDataController.addPolicyData(policyData); 
                console.log("what is result: "+JSON.stringify(result));  
              }
              else{
                res.status(401).json("User does not exist. Please create an account for the user");
              }             
          }                
        }
        else isNotAuthorized = true;    
    }  
    else isNotAuthorized = true;
}
catch(err) {
 isNotAuthorized = true; 
 console.log(err)
} 
isNotAuthorized ?  res.status(401).json("not authorized"): res.status(200).json("policy added successfully");
}          
  
exports.fetchPolicyDetails =async (req, res)=>{
    let isNotAuthorized = false;
    var policyData = {};
    //var response = {};
    var tokenData = {};   
    try{
        if(req.body.token ||req.headers.token ){
            let token = req.body.token ||req.headers.token;
            tokenData = jwt_controller.validateToken(token);
            if(tokenData.userName){
              policyData = await this.getPolicyDetailFromDb(tokenData);  
             // response.policyData = policyData;                                      
            }
            else isNotAuthorized = true;       
        }  
        else isNotAuthorized = true;
    }
    catch(err) {
     isNotAuthorized = true;     
    }    
   
  if (isNotAuthorized) res.status(401).json("not authorized");
  else res.status(200).json(policyData);
  };

  exports.getPolicyDetailFromDb = async (userData) => {
    let policyDetails = {};
    let policyDetailsForUser = {};
    const users = await billingAppDataController.getUserDetailsById(userData.userId);
    if(users && users.userID && users.userType == "AGENT"){
       policyDetails = await billingAppDataController.getPolicyDetailsByAgentId(users._id);
        for(let element of policyDetails){
           let userObj = await billingAppDataController.getUserDetailsByName(element.userID);
            element.userName = userObj.name
            console.log(element.userName)
        }
            return policyDetails;
   }
    if(users && users.userID && users.userType == "REGULAR"){
      policyDetailsForUser = await billingAppDataController.getPolicyDetailsByUserId(users._id);
        return policyDetailsForUser;
    }
};
