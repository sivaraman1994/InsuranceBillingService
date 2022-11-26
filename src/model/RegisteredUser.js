const mongoose = require("mongoose");
const schema = mongoose.Schema

let RegisteredUser = new schema({ 
    fullName:{type:String},
    email: {type:String},
    password: {type:String}
}, {
    collection: "userDetails"
})

  module.exports = mongoose.model("RegisteredUser",RegisteredUser)