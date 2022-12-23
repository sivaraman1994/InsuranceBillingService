const jwt = require('jsonwebtoken');

let jwtSecretKey = "my_secret_key";

exports.generateToken = (userDetails)=>{

    return jwt.sign(userDetails,jwtSecretKey,
        {
            expiresIn: '20m'
          });

}
exports.validateToken = (token) =>{
//     const isValid =  jwt.verify(token,jwtSecretKey);
//     if(isValid){
//         return jwt.decode(token,jwtSecretKey);
//     }
   return jwt.verify(token,jwtSecretKey);
 }


