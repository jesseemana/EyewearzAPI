export type UploadResponse = {
  image_path: string
  cloudinary_id: string
}

export type FilterType = { 
  limit: number 
  skip: number 
  filter: string 
}
