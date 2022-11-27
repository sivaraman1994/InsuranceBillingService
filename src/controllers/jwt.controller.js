const jwt = require('jsonwebtoken');

let jwtSecretKey = "my_secret_key";

exports.generateToken = (userDetails)=>{

    return jwt.sign(userDetails,jwtSecretKey,
        {
            expiresIn: '5m'
          });

}
exports.validateToken = (token) =>{
    return jwt.verify(token,jwtSecretKey);
}