const mongoose = require("mongoose");
const User_model = require("../model/userData.model")
const policyDtl_model = require("../model/policyData.model")
const ObjectID = mongoose.Types.ObjectId;

const jwt_controller = require("./jwt.controller");
// const uri = process.env.MONGODB_URI;
const uri ="mongodb://localhost:27017/Avengers";
const connectionParams = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}
  mongoose.connect(uri, connectionParams)
  .then(() => {
    process
    console.log('Connected to database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })


var userSchema = mongoose.model("users", User_model.getUserSchema());
var policyDtlSchema = mongoose.model("policyDetails", policyDtl_model.getPolicyDetailSchema(),"policyDetails");

exports.getUserDetailsById = async(userID) =>{
 return await userSchema.findOne({"userID":userID});
}

exports.getUserDetailsByName = async(ObjectID) =>{
  return await userSchema.findOne({"_id":ObjectID});
 }
 exports.getUserDetailsBYEmail = async(email) => {
    return await userSchema.findOne({"userID":email})
 }
 exports.getPolicyById = async(policyID) => {
  return await policyDtlSchema.findOne({"policyID":policyID})
}
 exports.updatePolicyDetailsByPolicyId = async(policyObj) =>{
  return await policyDtlSchema.updateOne({"policyID":policyObj.policyID},{"$set":{
    "policyCoverage" : policyObj.policyCoverage,
    "policyPremium" : policyObj.policyPremium,    
    "paymentStatus" : policyObj.paymentStatus,
    "isActive":policyObj.isActive

  }}); 
 }
 exports.addPolicyData = async(policyInfo) =>{
  policyInfo._id = new ObjectID();
  await policyDtlSchema.create(policyInfo)
  // return await policyDtlSchema.insertOne({"policyID":policyObj.policyID},{"$set":{
  //   "policyID" : policyObj.policyID,
  //   "policyName" : policyObj.policyName,
  //   "country" : policyObj.country,
  //   "policyCoverage" : policyObj.policyCoverage,
  //   "policyPremium" : policyObj.policyPremium,    
  //   "paymentStatus" : policyObj.paymentStatus,
  //   "isActive":policyObj.isActive
  //}}); 
 }
 exports.getPolicyDetailsByAgentId = async(userObjectID) =>{
  return await policyDtlSchema.find({"agentID":userObjectID,"isActive":true});  
 }


 exports.insertUserInfo = async(userInfo) =>{
  userInfo._id = new ObjectID();
  await userSchema.create(userInfo);

 }
 exports.getPolicyDetailsByUserId = async(userObjectID) =>{
  return await policyDtlSchema.find({"userID":userObjectID,"isActive":true});  
 }

 exports.checkExistingUser = async (req, res) => {
    
    //var userDetails = new userData(req.body);
    let userDetails ={};
   
    const users = await userSchema.findOne({"userID":req.body.userID,"password":req.body.password});
    console.log("what are the values of user: "+users);
    if( users != null && users.userID != null){ 
        userDetails.userName = users.name;  
        userDetails.userId = users.userID;        
        userDetails.userType = users.userType;
        if(userDetails.userType == "AGENT"){
           userDetails.agentID = users._id;
        }
        userDetails.token = jwt_controller.generateToken(userDetails);
           
    } 
    return userDetails;
    
};

