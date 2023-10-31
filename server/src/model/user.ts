import { DataTypes, Model } from 'sequelize';
import { sq } from '../config/dbConnect';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  refresh_token: string | null;
  created_at: Date;
  updated_at: Date;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}

const User = sq.define<UserInstance, UserAttributes>('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sq.fn('NOW'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sq.fn('NOW'),
  },
});

User.sync();

export default User;
