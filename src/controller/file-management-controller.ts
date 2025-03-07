import { NextFunction, Request, Response } from "express";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3, DeleteObjectCommand } from "@aws-sdk/client-s3";
import FileManagementError from "../error/error-class";

class FileManagementController {
  /**
   * uploadFile
   * @param file  on the Request
   */

  public static async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;

      if (!file) {
        throw new FileManagementError("Nenhum arquivo enviado!", 400);
      }
  
      const sanitizedFile = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");

      const uniqueFileName = `${Date.now()}-${sanitizedFile}`;

      const fileUpload = new Upload({
        client: new S3Client({ region: process.env.AWS_REGION }),
        params: {
          ACL: "public-read",
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: uniqueFileName,
          Body: file.buffer,
        },
      });

      await fileUpload.done();


      res
        .status(200)
        .send(
          `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`
        );
      return;
    } catch (error) {
        next(error)
    }
  }

  public static async deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
      const fileName = req.params.fileName;

      if (!fileName) {
        throw new FileManagementError("Nome do arquivo não fornecido!", 400);
      }

      const s3 = new S3Client({ region: process.env.AWS_REGION });

      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
      };

      const command = new DeleteObjectCommand(deleteParams);

      await s3.send(command);

      res.status(200).send("Arquivo deletado com sucesso!");
    } catch (error) {
      next(error)
    }
  }
}

export default FileManagementController;
