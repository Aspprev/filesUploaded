import { Router } from "express";
import FileManagementController from "../controller/file-management-controller";
import multer from "multer";
import Token from "../authentication/auth-handler";

const fileManagementRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

fileManagementRouter.post("/",Token.verifyToken,upload.single('file'), FileManagementController.uploadFile);
fileManagementRouter.delete("/:fileName",Token.verifyToken, FileManagementController.deleteFile);

export default fileManagementRouter;