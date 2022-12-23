const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

exports.getPolicyDetailSchema = () => {
    var policyDtlSchema = mongoose.Schema(
        {
            _id:mongoose.Types.ObjectId,
            policyID:String,
            policyName: String,
            userName: String,
            agentName: String,
            policyCoverage : Number,
            policyPremium: Number,
            userID: mongoose.Types.ObjectId,
            agentID: mongoose.Types.ObjectId,
            travelStartDate: Date,
            travelEndDate: Date,
            country: String,
            //userEmail:String,
            paymentStatus: {type:String},
            dueDate: Date,
            isActive:Boolean
        },
        { timestamps: true }
    );
    return policyDtlSchema;
}
