import User from './user.model';
import Band from './band.model';
import Rehearsal from './rehearsal.model';
import logger from '../utils/logger';

// Define model associations
const setupAssociations = (): void => {
  try {
    // User and Band associations
    User.hasMany(Band, {
      foreignKey: 'ownerId',
      as: 'ownedBands'
    });
    
    Band.belongsTo(User, {
      foreignKey: 'ownerId',
      as: 'owner'
    });
    
    // Many-to-many: Users can be members of multiple Bands
    // This creates the join table 'band_members'
    User.belongsToMany(Band, {
      through: 'band_members',
      foreignKey: 'userId',
      otherKey: 'bandId',
      as: 'memberOfBands'
    });
    
    Band.belongsToMany(User, {
      through: 'band_members',
      foreignKey: 'bandId',
      otherKey: 'userId',
      as: 'members'
    });
    
    // Band and Rehearsal associations
    Band.hasMany(Rehearsal, {
      foreignKey: 'bandId',
      as: 'rehearsals'
    });
    
    Rehearsal.belongsTo(Band, {
      foreignKey: 'bandId',
      as: 'band'
    });
    
    // Creator of rehearsal
    User.hasMany(Rehearsal, {
      foreignKey: 'createdById',
      as: 'createdRehearsals'
    });
    
    Rehearsal.belongsTo(User, {
      foreignKey: 'createdById',
      as: 'creator'
    });
    
    // Many-to-many: Users can mark availability for Rehearsals
    // This creates the join table 'availabilities'
    User.belongsToMany(Rehearsal, {
      through: 'availabilities',
      foreignKey: 'userId',
      otherKey: 'rehearsalId',
      as: 'availableForRehearsals'
    });
    
    Rehearsal.belongsToMany(User, {
      through: 'availabilities',
      foreignKey: 'rehearsalId',
      otherKey: 'userId',
      as: 'availableMembers'
    });
    
    // Many-to-many: Users attendance for Rehearsals
    // This creates the join table 'attendances'
    User.belongsToMany(Rehearsal, {
      through: 'attendances',
      foreignKey: 'userId',
      otherKey: 'rehearsalId',
      as: 'attendedRehearsals'
    });
    
    Rehearsal.belongsToMany(User, {
      through: 'attendances',
      foreignKey: 'rehearsalId',
      otherKey: 'userId',
      as: 'attendees'
    });
    
    logger.info('Sequelize associations established successfully');
  } catch (error) {
    logger.error('Error setting up Sequelize associations:', error);
  }
};

// Export models and association setup
export {
  User,
  Band,
  Rehearsal,
  setupAssociations
};