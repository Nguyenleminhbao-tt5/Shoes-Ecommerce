import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { IResponse } from '@/common/interfaces/response.interface';
import { UploadFile } from 'antd';
import { IImageUpload } from '@/common/interfaces/imageUpload.interface';

@Injectable()
export class UploadService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dslnmqvlb',
      api_key: `${process.env.CLOUDINARY_API_KEY}`,
      api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
    });
  }

  async uploadImages(fileList: UploadFile[]) {
    try {
      const images: string[] = fileList.map((file) => file.thumbUrl as string);
      let uploadImages: IImageUpload[] = [];
      for (let image of images) {
        const result = await cloudinary.uploader.upload(image);
        console.log(result);
        console.log('result', {
          url: result.secure_url,
          photo_id: result.public_id,
        });
        uploadImages.push({
          url: result.secure_url,
          photo_id: result.public_id,
        });
      }
      return uploadImages;
    } catch (err) {
      return {
        type: 'Error',
        code: HttpStatus.BAD_REQUEST,
        data: 'Uploading images failed',
      } as IResponse;
    }
  }

  async removeImages (listPhotoId: string[]){
    try{
        listPhotoId.forEach( async (photo_id:string)=>{
            await cloudinary.uploader.destroy(photo_id);
        })
    }
    catch(err){
        return {
            type: 'Error',
            code: HttpStatus.BAD_REQUEST,
            data: 'Remove images failed'
        } as IResponse
    }
}
}
