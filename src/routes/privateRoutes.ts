import {Router, Request, Response, NextFunction} from "express"

import * as Handlers from "../handlers/privateHandlers"

const router = Router();

router.get("/admin-login", Handlers.GetAdminLogin);


export {router};