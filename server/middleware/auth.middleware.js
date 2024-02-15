import jwt  from "jsonwebtoken";



export const  logout = async(req, res, next)=>{
    try {
        const token = req.cookie?.accessToken || req.headers("Authorization").replace("Bearer","")
        if(!token) return res.status(401).send("Access Denied")
        const decoded = jwt.verify(token, process.env.ACCES_TOKEN_SECRET)
        req.user = decoded
    } catch (error) {
        res.status(401).send("Invalid Token")
    }
}