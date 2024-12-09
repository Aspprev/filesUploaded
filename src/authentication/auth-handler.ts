import { NextFunction, Request, Response } from "express";
import FileManagementError from "../error/error-class";

class Token {
  public static async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers.authorization;
    if (!token) {
      return next(new FileManagementError("Token inválido!", 401));
    }
    const tokenArray = token.split(" ");

    try {
      const validationjson = await fetch(
        `https://apihmg.aspprev.tec.br/ValidarTokenOWN.rule?sys=INT`,
        {
          headers: {
            Authorization: tokenArray[0],
          },
        }
      );

      if (validationjson.status === 400) {
        return next(new FileManagementError("Token inválido!", 401));
      }
    } catch (error) {
      return next(new FileManagementError("Token inválido!", 401));
    }

    next();
  }
}

export default Token;
