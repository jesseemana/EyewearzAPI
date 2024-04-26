import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

type UploadResponse = {
  image_path: string
  cloudinary_id: string
}

const uploadPicture = async (path: string): Promise<UploadResponse> => {
  const response = await cloudinary.uploader.upload(path);
  return {
    image_path: response.url,
    cloudinary_id: response.public_id,
  }
}

export default uploadPicture
