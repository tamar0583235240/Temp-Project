// import { Request, Response, NextFunction } from "express";

<<<<<<< HEAD
// //#region example for implemantaion Middleware
// export const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const timestamp = new Date().toISOString();
//         const method = req.method;
//         const url = req.originalUrl;
=======
export const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const timestamp = new Date().toISOString();
        const method = req.method;
        const url = req.originalUrl;
>>>>>>> Activity-Monitoring

//         console.log(`[${timestamp}] ${method} ${url}`);

<<<<<<< HEAD
//         next();
//     } catch (error) {
//         console.error("Error in exampleMiddleware:", error);
//         res.status(500).json({ message: "Internal Server Error in middleware" });
//     }
// };
// //#endregion
=======
        next();
    } catch (error) {
        console.error("Error in exampleMiddleware:", error);
        res.status(500).json({ message: "Internal Server Error in middleware" });
    }
};
>>>>>>> Activity-Monitoring
