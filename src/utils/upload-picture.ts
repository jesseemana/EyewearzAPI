import { v2 as cloudinary } from 'cloudinary'
import log from './logger'
import { UploadResponse } from '../types'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

async function uploadPicture(file: Express.Multer.File): Promise<UploadResponse> {
  try {
    const image = file
    const base64Image = Buffer.from(image.buffer).toString('base64')
    const dataURI = `data:${image.mimetype};base64,${base64Image}`

    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      transformation: [
        { width: 1000, crop: 'scale' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ],
      folder: 'glasses',
    })

    return {
      image_path: uploadResponse.url,
      cloudinary_id: uploadResponse.public_id
    }
  } catch (error) {
    log.error(`Error uploading picture: ${error}`)
    throw new Error('Failed to upload picture')
  }
}

export default uploadPicture
