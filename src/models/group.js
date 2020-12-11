import pkg1 from 'sequelize';

const { DataTypes, Model } = pkg1;

export default (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsToMany(models.User, {
        through: 'UserGroups',
        foreignKey: 'groupId',
        otherKey: 'userId',
      });
      Group.hasMany(models.Message, { foreignKey: 'groupId', as: 'messages' });
      Group.belongsTo(models.User, { foreignKey: 'adminId' });
    }
  }

  Group.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Group',
    }
  );
  return Group;
};
