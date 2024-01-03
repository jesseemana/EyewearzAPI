import cloudinary from './cloudinary'

const uploadPicture = async (picture: string): Promise<UploadResponse> => {
  const response = await cloudinary.uploader.upload(picture)
  return {
    image: response.url,
    cloudinary_id: response.public_id,
  }
}

export default uploadPicture
