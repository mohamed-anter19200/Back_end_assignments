import {Router} from "express";
import * as authController from "./auth.controller.js";
import {validationMiddleware} from "../../middleware/validation.middleware.js";
import {googleLoginDTO, loginDTO, registerDTO, sendOtpDTO, verifyAccountDTO} from "./auth.dto.js";

const authRouter = Router()

authRouter.post("/register", validationMiddleware(registerDTO) ,authController.registerUser );
authRouter.patch("/verify-account",validationMiddleware(verifyAccountDTO) ,authController.verifyAccount );
authRouter.post("/send-otp", validationMiddleware(sendOtpDTO) ,authController.sendNewOtp)
authRouter.post("/login",validationMiddleware(loginDTO),authController.loginUser)
authRouter.post("/login-with-google",validationMiddleware(googleLoginDTO),authController.loginWithGoogle)

export default authRouter;