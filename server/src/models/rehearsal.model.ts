import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

/**
 * @swagger
 * components:
 *   schemas:
 *     Rehearsal:
 *       type: object
 *       required:
 *         - bandId
 *         - title
 *         - startTime
 *         - endTime
 *         - createdById
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *         bandId:
 *           type: string
 *           description: ID of the band the rehearsal belongs to
 *         title:
 *           type: string
 *           description: Title of the rehearsal
 *         description:
 *           type: string
 *           description: Detailed description of the rehearsal
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: When the rehearsal starts
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: When the rehearsal ends
 *         venueId:
 *           type: string
 *           description: ID of the venue where the rehearsal takes place
 *         isRecurring:
 *           type: boolean
 *           description: Whether this is a recurring rehearsal
 *         recurringPattern:
 *           type: object
 *           description: JSON object describing the recurrence pattern
 *         createdById:
 *           type: string
 *           description: ID of the user who created the rehearsal
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the rehearsal was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the rehearsal was last updated
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         bandId: 123e4567-e89b-12d3-a456-426614174001
 *         title: Weekly Practice
 *         description: Practicing for the upcoming gig at The Venue
 *         startTime: "2025-07-15T18:00:00.000Z"
 *         endTime: "2025-07-15T21:00:00.000Z"
 *         venueId: 123e4567-e89b-12d3-a456-426614174002
 *         isRecurring: true
 *         recurringPattern: {"frequency":"weekly","day":"tuesday","until":"2025-12-31"}
 *         createdById: 123e4567-e89b-12d3-a456-426614174003
 *         createdAt: "2025-06-01T00:00:00.000Z"
 *         updatedAt: "2025-06-01T00:00:00.000Z"
 */

// Rehearsal attributes interface
interface RehearsalAttributes {
  id: string;
  bandId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  venueId?: string;
  isRecurring: boolean;
  recurringPattern?: object;
  createdById: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Rehearsal creation attributes interface (optional fields for creation)
interface RehearsalCreationAttributes extends Optional<RehearsalAttributes, 'id' | 'description' | 'venueId' | 'recurringPattern'> {}

// Rehearsal model class
class Rehearsal extends Model<RehearsalAttributes, RehearsalCreationAttributes> implements RehearsalAttributes {
  public id!: string;
  public bandId!: string;
  public title!: string;
  public description?: string;
  public startTime!: Date;
  public endTime!: Date;
  public venueId?: string;
  public isRecurring!: boolean;
  public recurringPattern?: object;
  public createdById!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize Rehearsal model
Rehearsal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bandId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'bands',
        key: 'id'
      }
    },
    title: {
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
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterStart(value: Date) {
          if (new Date(value) <= new Date(this.startTime)) {
            throw new Error('End time must be after start time');
          }
        }
      }
    },
    venueId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'venues',
        key: 'id'
      }
    },
    isRecurring: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    recurringPattern: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdById: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Rehearsal',
    tableName: 'rehearsals',
  }
);

// Define associations
// This will be done in an associations.ts file to avoid circular dependencies

export default Rehearsal;