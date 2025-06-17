import { Request, Response, NextFunction } from "express";


export const answerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        console.log(`answerMiddleware called [${req.method}] ${req.originalUrl}`);
        next();
    }catch (error) {
        console.error("Error in answerMiddleware:", error);
        res.status(500).json({ message: "Internal Server Error in middleware" });
    }
  };
