import { Request, Response } from 'express';
import User from '../model/user';

class LogoutController {
  async handleLogout(req: Request, res: Response): Promise<void> {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!foundUser) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      return res.sendStatus(204);
    }

    foundUser.refresh_token = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
  }
}

export default LogoutController;
