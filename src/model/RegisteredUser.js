const mongoose = require("mongoose");
const schema = mongoose.Schema

let RegisteredUser = new schema({
    userID: { type: String },
    name: { type: String },
    password: { type: String }
},
    {
        collection: "userDetails"
    })

module.exports = mongoose.model("RegisteredUser", RegisteredUser)