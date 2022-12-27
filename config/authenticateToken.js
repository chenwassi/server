const jwt =require('jsonwebtoken')

exports.tokenMiddleware=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    const token=authHeader &&authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user )=>{
      if(err) return res.sendStatus(403)
      req.user=user
      next()
    })
  }

  exports.generateAccessToken=(user)=>{
    if(user.iat||user.exp){
      delete user.iat
      delete user.exp
    }
     return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
     }