import jwt from 'jsonwebtoken'
import config from 'config'

export const signJwt = (
  object: Object, 
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey', 
  options?: jwt.SignOptions | undefined
): string => {
  const signing_key = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii')

  const token = jwt.sign(object, signing_key, { 
  ...(options && options), // options is jwt time to live
  algorithm: 'RS256'
  }) as string

  return token
}

export const verifyToken = <T> (
  token: string, 
  verifyKey: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  const public_key = Buffer.from(config.get<string>(verifyKey), 'base64').toString('ascii')

  try {
    const decoded = jwt.verify(token, public_key) as T
    return decoded
  } catch(e) {
    return null
  }
}
