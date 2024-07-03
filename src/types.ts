export type UploadResponse = {
  image_path: string
  cloudinary_id: string
}

export type FilterType = { 
  limit: number 
  skip: number 
  filter: string 
}

export type UserType = {
  _id: string
  first_name: string
  last_name: string
  role: string
  email: string
  location: string
  reset_code: string | null
}
  
export type SessionType = {
  _id: string
  ip: string
  user_agent: string
  user: string
  valid: boolean
}

export type DecodedType = {
 user: UserType
 session: SessionType
}

