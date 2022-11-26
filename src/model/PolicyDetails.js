const mongoose = require("mongoose");
const schema = mongoose.Schema

let PolicyDetail = new schema({ 
    policyID:{type:String},
    userID: {type:String},
    agentID: {type:String},
    policyName: {type:String},
    policyCoverage: {type: Number},
    policyPremium: {type: Number},
    travelStartDate: {type:String},
    travelEndDate: {type: String},
    country: {type:String},
    paymentStatus: {type:String},
    dueDate: {type:String},

}, {
    collection: "policyDetails"
})

  module.exports = mongoose.model("PolicyDetail",PolicyDetail)
 
