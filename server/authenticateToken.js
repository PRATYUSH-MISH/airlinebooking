const jwt = require('jsonwebtoken');
const {secretKey} = require('./jwtConfig')
const authenticateToken=(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized, token missing' });
    }
    const token =req.headers.authorization.split(' ')[1];
    if(!token){return res.status(401).json({error:'Unauthorized'})}
try {
    //verify the jwt token 
    const decoded=jwt.verify(token,secretKey);
    req.user=decoded;
next()
} catch (err) {
    console.error(err);
    res.status(401).json ({error:"invaild Token"})
}

}
const generateToken=(userData)=>{
    const payload = { id: userData._id, email: userData.email };
    return jwt.sign(userData, secretKey, { expiresIn: "1h" })
}


module.exports={authenticateToken,generateToken}







// const authenticateToken = (req, res, next) => {
//     const authHeader = req.header('Authorization');
//     if (!authHeader) return res.status(401).json({ message: "Missing token! :Access Denied" });

//     const [bearer, token] = authHeader.split(" ")
//     if (bearer !== "Bearer" || !token) {
//         return res.status(401).json({ message: "Unauthorized :invalid token Fromat" })

//     }
//     jwt.verify(token, secretKey, (err, user) => {
//         if (!err) {
//             return res.status(400).json({ message: "Forbidden :Invalid Token" })
//         }
//         req.user = user;
        
//         next();
//     })
            
// };
// // function verifyToken(token) {
// //     return jwt.verify(token, secretKey);
// // }
// module.exports = { authenticateToken, verifyToken }