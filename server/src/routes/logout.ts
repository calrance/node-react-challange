import express, { Router } from 'express';
import LogoutController from '../controller/logout.controller';

const router: Router = express.Router();
const logoutController = new LogoutController();

router.get('/', logoutController.handleLogout);

export { router };
