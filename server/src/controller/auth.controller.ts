import { Request, Response } from 'express';
import User from '../model/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
  async handleLogin (req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required!' });
    }
  
    const foundUser: any = await User.findOne({
      where: {
        username: username,
      },
    });
  
    if (!foundUser) {
      return res.sendStatus(401); // Unauthorized
    }
  
    const match: boolean = await bcrypt.compare(password, foundUser.password);
  
    if (match) {
      const accessToken: string = jwt.sign(
        {
          username: foundUser.username,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '30s' },
      );
  
      const refreshToken: string = jwt.sign(
        {
          username: foundUser.username,
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '1d' },
      );
      foundUser.refresh_token = refreshToken;
      const result: any = await foundUser.save();
  
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ message: 'Welcome', accessToken: accessToken });
    } else {
      res.sendStatus(401); // Unauthorized
    }
  };
}

export default AuthController;