import {Router, Request, Response, NextFunction} from "express"

import * as Handlers from "../handlers/publicHandlers"

const router = Router();


router.get("/", Handlers.Home);
router.get("/about", Handlers.About)



export {router};