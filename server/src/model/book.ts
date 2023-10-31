import { DataTypes, Model } from 'sequelize';
import { sq } from '../config/dbConnect';

interface BookAttributes {
  id: number;
  title: string;
  author: string;
  genre: string;
  publication_date: Date;
  price: number;
  stock: number;
}

interface BookInstance extends Model<BookAttributes>, BookAttributes {}

const Book = sq.define<BookInstance, BookAttributes>('book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
  },
  publication_date: {
    type: DataTypes.DATE,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  stock: {
    type: DataTypes.INTEGER,
  },
});

Book.sync();

export default Book;
