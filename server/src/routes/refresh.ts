import express, { Router } from 'express';
import RefreshTokenController from '../controller/refreshToken.controller';

const router: Router = express.Router();
const refreshTokenController = new RefreshTokenController();

router.route('/').get(refreshTokenController.handleRefreshToken);

export { router };
