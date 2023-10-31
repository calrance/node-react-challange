import { Request, Response } from 'express';
import Book from '../model/book';

class BookController {
  async getAllBooks(_req: Request, res: Response): Promise<void> {
    try {
      const allBooks = await Book.findAll();
      res.json(allBooks);
    } catch (error) {
      console.error('Error retrieving all books:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default BookController;