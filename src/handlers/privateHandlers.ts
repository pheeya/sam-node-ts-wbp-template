import { Request, Response, NextFunction } from "express"
export const GetAdminLogin = async function (req: Request, res: Response, next: NextFunction) {

    res.render("private/AdminLogin");

}