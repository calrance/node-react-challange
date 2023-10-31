import { Request, Response } from 'express';
import User from '../model/user';
import jwt from 'jsonwebtoken';

class RefreshTokenController {
  async handleRefreshToken(req: Request, res: Response): Promise<void> {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!foundUser) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username)
          return res.sendStatus(403);
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: decoded.username,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '10s' },
        );
        res.json({ accessToken });
      },
    );
  }
}

export default RefreshTokenController;
