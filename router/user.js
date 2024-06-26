import express from 'express';

const userRoutes = express.Router();

import * as user from "../controller/usercontroller.js";
import { checkRole, jwt } from "../middelwares/jwt.js";
import { paginationMiddleware } from "../middelwares/pagination.js";

/**
 * @swagger
 * /userdata:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 formate: email
 *               password:
 *                 type: string
 *                 formate: password
 *               cpassword:
 *                 type: string
 *                 formate: password
 *             required:
 *               - fname
 *               - lname
 *               - username
 *               - email
 *               - password
 *               - cpassword
 *     responses:
 *       '200':
 *         description: User successfully registered.
 *       '400':
 *         description: Bad request.
 */
userRoutes.get("/register", user.register);
userRoutes.post("/userdata", user.userdata);

/**
 * @swagger
 * /logindata:
 *   post:
 *     tags:
 *       - User
 *     summary: Log in a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 formate: email
 *               password:
 *                 type: string
 *                 formate: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User successfully logged in.
 *       '400':
 *         description: Bad request.
 */
userRoutes.get("/login", user.login);
userRoutes.post("/logindata", user.logindata);

/**
 * @swagger
 * /email_address:
 *   post:
 *     tags:
 *       - User
 *     summary: Send an email for password reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema: 
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 formate: email
 *             required:
 *               - email 
 *     responses:
 *       '200':
 *         description: Password reset email sent successfully.
 *       '400':
 *         description: Bad request.
 */
userRoutes.get("/forgot_password", user.forgotpassword);
userRoutes.post("/email_address", user.emailAddress);

/**
 * @swagger
 * /otpdata:
 *   post:
 *     tags:
 *       - User
 *     summary: Verify the OTP sent for password reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *             required:
 *               - otp
 *     responses:
 *       '200':
 *         description: OTP verified successfully.
 *       '400':
 *         description: Bad request.
 */
userRoutes.get("/getOtp", user.getOtp);
userRoutes.post("/otpdata", user.otpdata);

/**
 * @swagger
 * /new_password:
 *   post:
 *     tags:
 *       - User
 *     summary: Change user password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string 
 *                 formate: password
 *               cpassword:
 *                 type: string
 *                 formate: password
 *             required:
 *               - password
 *               - cpassword
 *     responses:
 *       '200':
 *         description: Password changed successfully.
 *       '400':
 *         description: Bad request.
 */
userRoutes.get("/change_password", user.changepassword);
userRoutes.post("/new_password", user.newpassword);

/**
 * @swagger
 * /logout:
 *   get:
 *     tags:
 *       - User
 *     summary: logout from app.
 *     responses:
 *       '200':
 *         description: Successfully logout frm app.
 */
userRoutes.get("/logout", user.logout);

/**
 * @swagger
 * /newUserdata:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user by an admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object 
 *             properties:
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 formate: email
 *               role:
 *                 type: string
 *             required:
 *               - fname
 *               - lname
 *               - username
 *               - email
 *               - role
 *     responses:
 *       '200':
 *         description: User successfully registered by an admin.
 *       '400':
 *         description: Bad request.
 */
userRoutes.get("/newUser", jwt, checkRole('superAdmin'), user.newUser);
userRoutes.post("/newUserdata", jwt, checkRole('superAdmin'), user.newUserdata);

/**
 * @swagger
 * /msg-ai:
 *   post:
 *     tags:
 *       - User
 *     summary: Ask any Question.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object 
 *             properties:
 *               msg:
 *                 type: string
 *             required:
 *               - msg
 *     responses: 
 *       '200':
 *         description: User successfully registered by an admin. 
 *       '400':
 *         description: Bad request.
 */
userRoutes.post("/msg-ai", jwt, paginationMiddleware, user.msgToAI);

export { userRoutes };