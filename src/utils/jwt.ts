import jwt from 'jsonwebtoken'

const signJwt = (
  object: Object, 
  keyName: string, 
  options?: jwt.SignOptions | undefined
): string => {
  const signing_key = Buffer.from(keyName, 'base64').toString('ascii')

  const token = jwt.sign(object, signing_key, { 
    ...(options && options), // options - jwt time to live
    algorithm: 'RS256'
  })

  return token
}

const verifyToken = <T> (
  token: string, 
  verifyKey: string
): T | null => {
  const public_key = Buffer.from(verifyKey, 'base64').toString('ascii')

  try {
    const decoded = jwt.verify(token, public_key) as T
    return decoded
  } catch(e) {
    return null
  }
}

export default {
  signJwt,
  verifyToken,
}
