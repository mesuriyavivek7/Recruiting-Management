import jwt from 'jsonwebtoken'


export const verifyToken=async (req,res,next)=>{
     const token= req.header('x-auth-token')
     if(!token){
        return res.status(401).json("No Token. authorization denied")
     }

     try{
        const decoded=jwt.verify(token,process.env.JWT)
        req.user=decoded
        next()
     }catch(err){
        res.status(401).json("Token is not valid")
     }
}