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


