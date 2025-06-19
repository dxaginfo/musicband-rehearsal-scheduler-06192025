import { Model, DataTypes, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/database';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - firstName
 *         - lastName
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address (unique)
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         password:
 *           type: string
 *           format: password
 *           description: User's password (hashed)
 *         phone:
 *           type: string
 *           description: User's phone number
 *         profileImageUrl:
 *           type: string
 *           format: uri
 *           description: URL to user's profile image
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the user was last updated
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         email: john.doe@example.com
 *         firstName: John
 *         lastName: Doe
 *         phone: "1234567890"
 *         profileImageUrl: https://example.com/profiles/johndoe.jpg
 *         createdAt: "2023-01-01T00:00:00.000Z"
 *         updatedAt: "2023-01-01T00:00:00.000Z"
 */

// User attributes interface
interface UserAttributes {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  profileImageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// User creation attributes interface (optional fields for creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'phone' | 'profileImageUrl'> {}

// User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;
  public phone?: string;
  public profileImageUrl?: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Instance methods
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  // Method to return user data without sensitive fields
  public toJSON(): Omit<UserAttributes, 'password'> {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}

// Initialize User model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      // Hash password before saving
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      // Hash password before updating
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;