import cloudinary from './cloudinary'

interface UploadResponse {
  image: string
  cloudinary_id: string
}

const upload_picture = async (picture: string): Promise<UploadResponse> => {
  const response = await cloudinary.uploader.upload(picture)
  return {
    image: response.url,
    cloudinary_id: response.public_id,
  }
}

export default upload_picture
