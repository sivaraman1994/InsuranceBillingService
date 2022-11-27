const mongoose = require("mongoose");

exports.getUserSchema = () => {
    var userSchema = mongoose.Schema(
        {
            _id:mongoose.Types.ObjectId,
            userID: String,
            password: {
                type: String,
                required: true,
                trim: true,
                minlength: 7
             },
            userType: String,
            name:String
        },
        { timestamps: true }
    );
    return userSchema;
};