import express, { Router } from 'express';
import AuthController from '../controller/auth.controller';

const router: Router = express.Router();
const authController = new AuthController();

router.post('/', authController.handleLogin);

export { router };
