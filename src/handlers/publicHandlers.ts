
import { Request, Response, NextFunction } from "express"


export const Home = function (req: Request, res: Response, next: NextFunction) 
{

    res.render("Home");


}

export const About = function (req: Request, res: Response, next: NextFunction) {
    res.render("About");
}

