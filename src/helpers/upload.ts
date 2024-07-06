import { v2 as cloudinary } from 'cloudinary'
import log from '../utils/logger'

type UploadResponse = {
  image: string
  cloudinary_id: string
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadPicture(file: string): Promise<UploadResponse> {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      transformation: [
        { width: 1000, crop: 'scale' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ],
      folder: 'glasses',
    })

    return {
      image: uploadResponse.url,
      cloudinary_id: uploadResponse.public_id
    }
  } catch (error) {
    log.error(`Error uploading picture: ${error}`)
    throw new Error('Failed to upload picture')
  }
}
