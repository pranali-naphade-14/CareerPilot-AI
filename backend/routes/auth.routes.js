const {Router} = require("express")
const controller=require("../controllers/auth.controller")
const authMiddleware=require("../middlewares/auth.middleware")

const authRouter=Router()

authRouter.post("/register",controller.registerUser)

authRouter.post("/login",controller.loginUser)

authRouter.get("/logout",controller.logoutUser)

authRouter.get("/get-me",authMiddleware.authUser, controller.getMeController)

module.exports=authRouter