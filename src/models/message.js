import pkg1 from 'sequelize';

const { Model } = pkg1;

export default (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, { foreignKey: 'userId', as: 'sender' });
      Message.belongsTo(models.Group, {
        foreignKey: 'groupId',
      });
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );
  return Message;
};
