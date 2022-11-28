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

exports.getPolicyDetailsByAgentId = async(userObjectID) =>{
  return await policyDtlSchema.find({"agentID":userObjectID});  
 }

 exports.insertUserInfo = async(userInfo) =>{
  userInfo._id = new ObjectID();
  await userSchema.create(userInfo);

 }
 
exports.checkExistingUser = async (req, res) => {
    
    //var userDetails = new userData(req.body);
    let userDetails ={};
   
    const users = await userSchema.findOne({"userID":req.body.userID,"password":req.body.password});
    
    if( users != null && users.userID != null){ 
        userDetails.userName = users.name;  
        userDetails.userId = users.userID;        
        userDetails.userType = users.userType;
        userDetails.token = jwt_controller.generateToken(userDetails);
           
    } 
    return userDetails;
    
};


