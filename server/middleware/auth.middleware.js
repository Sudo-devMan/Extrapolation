
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET

export const isAuthenticated = async(req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({success: false, message: 'No auth found in the request headers'})
 
  try {
    const prefix = authHeader.split(' ')[0]
    const token = authHeader.split(' ')[1]
    if (prefix !== 'Broski') return res.status(401).json({ success: false, message: "The token prefix is not Broski" })
    const decoded = jwt.verify(token, secret)
    req.user = decoded
    next()
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: err.message })
  }
}

