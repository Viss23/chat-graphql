import Sequelize from 'sequelize';
import DATABASE_URL from '../config/dbConfig.js';

import Message from './message.js';
import User from './user.js';
import Group from './group.js';
/* import Participants from './participants';
import MessageLike from './messageLike'; */

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
});

User(sequelize, Sequelize.DataTypes);
Message(sequelize, Sequelize.DataTypes);
Group(sequelize, Sequelize.DataTypes);

const models = sequelize.models;

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export default models;
