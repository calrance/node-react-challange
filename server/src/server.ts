import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import { fileURLToPath } from 'url';
import { dirname, default as path } from 'path';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import credentials from './middleware/credentials';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

import { connectDB } from './config/dbConnect';
import verifyJWT from './middleware/verifyJWT';
import { router as authRouter } from './routes/auth';
import { router as logoutRouter } from './routes/logout';
import { router as refreshTokenRouter } from './routes/refresh';
import { router as bookRouter } from './routes/api/book';

connectDB();

// Middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRouter);
app.use('/logout', logoutRouter);
app.use('/refresh', refreshTokenRouter);

app.use(verifyJWT);
app.use('/book', bookRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).sendFile(__dirname + '/views/404.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
