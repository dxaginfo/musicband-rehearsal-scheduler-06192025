import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user.model';

/**
 * @swagger
 * components:
 *   schemas:
 *     Band:
 *       type: object
 *       required:
 *         - name
 *         - ownerId
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *         name:
 *           type: string
 *           description: Band name
 *         description:
 *           type: string
 *           description: Band description
 *         logoUrl:
 *           type: string
 *           format: uri
 *           description: URL to band's logo image
 *         ownerId:
 *           type: string
 *           description: ID of the user who created/owns the band
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the band was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the band was last updated
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         name: The Rockstars
 *         description: A rock band from San Francisco
 *         logoUrl: https://example.com/bands/rockstars.jpg
 *         ownerId: 123e4567-e89b-12d3-a456-426614174001
 *         createdAt: "2023-01-01T00:00:00.000Z"
 *         updatedAt: "2023-01-01T00:00:00.000Z"
 */

// Band attributes interface
interface BandAttributes {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Band creation attributes interface (optional fields for creation)
interface BandCreationAttributes extends Optional<BandAttributes, 'id' | 'description' | 'logoUrl'> {}

// Band model class
class Band extends Model<BandAttributes, BandCreationAttributes> implements BandAttributes {
  public id!: string;
  public name!: string;
  public description?: string;
  public logoUrl?: string;
  public ownerId!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize Band model
Band.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    modelName: 'Band',
    tableName: 'bands',
  }
);

// Define associations
// This will be done in an associations.ts file to avoid circular dependencies

export default Band;