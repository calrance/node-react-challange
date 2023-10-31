import express, { Router } from 'express';
import BookController from '../../controller/book.controller';

const router: Router = express.Router();
const bookController = new BookController();

router.route('/').get(bookController.getAllBooks);

export { router };
