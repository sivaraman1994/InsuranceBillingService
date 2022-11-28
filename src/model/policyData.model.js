const mongoose = require("mongoose");

exports.getPolicyDetailSchema = () => {
    var policyDtlSchema = mongoose.Schema(
        {
            _id:mongoose.Types.ObjectId,
            policyName: String,
            policyCoverage : Number,
            policyPremium: Number,
            userID: String,
            agentID: mongoose.Types.ObjectId,
            travelStartDate: Date,
            travelEndDate: Date,
            country: String,
            paymentStatus: {type:String},
            dueDate: Date
        },
        { timestamps: true }
    );
    return policyDtlSchema;
}