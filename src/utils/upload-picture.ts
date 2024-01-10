import cloudinary from './cloudinary'

interface UploadResponse {
  image: string
  cloudinary_id: string
}

const uploadPicture = async (picture: string): Promise<UploadResponse> => {
  const response = await cloudinary.uploader.upload(picture)
  return {
    image: response.url,
    cloudinary_id: response.public_id,
  }
}

export default uploadPicture
