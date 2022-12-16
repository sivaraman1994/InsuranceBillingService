const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

exports.getPolicyDetailSchema = () => {
    var policyDtlSchema = mongoose.Schema(
        {
            _id:mongoose.Types.ObjectId,
            policyName: String,
            userName: String,
            policyCoverage : Number,
            policyPremium: Number,
            userID: String,
            agentID: mongoose.Types.ObjectId,
            travelStartDate: Date,
            travelEndDate: Date,
            country: String,
            userName:String,
            paymentStatus: {type:String},
            dueDate: Date
        },
        { timestamps: true }
    );
    return policyDtlSchema;
}