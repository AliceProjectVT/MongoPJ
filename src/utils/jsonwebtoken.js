import jwt from 'jsonwebtoken'
const PRIVATE_KEY = 'palabrasecreta'

const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
  return token
}
const authToken = (req, res, next) => {
  const authHeader = req.headers['autorization']//Bearer
  if (!authHeader) {
    return res.status(401).json({ status: 'error', error: 'Not Autenticated' })
  }
  const token = authHeader.split(' ')[1]
  jwt.verify(token, PRIVATE_KEY, (error, credential) => {
    if (error) {
      return res.status(403).json({ status: 'error', error: 'No autorizado' })
    }
    req.user = credential.user
    next()
  })

}
export { generateToken, authToken }