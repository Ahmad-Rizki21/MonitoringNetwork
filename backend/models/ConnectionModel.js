const { DataTypes } = require("sequelize");
const db = require("../config/database.js");
const Device = require("./DeviceModel.js");

const Connection = db.define('connections', {
  sourceId: {
    type: DataTypes.INTEGER,
    references: {
      model: Device,
      key: 'id'
    }
  },
  targetId: {
    type: DataTypes.INTEGER,
    references: {
      model: Device,
      key: 'id'
    }
  }
}, {
  freezeTableName: true
});

// Definisikan relasi
Device.hasMany(Connection, { as: 'sourceConnections', foreignKey: 'sourceId' });
Device.hasMany(Connection, { as: 'targetConnections', foreignKey: 'targetId' });
Connection.belongsTo(Device, { as: 'sourceDevice', foreignKey: 'sourceId' });
Connection.belongsTo(Device, { as: 'targetDevice', foreignKey: 'targetId' });

module.exports = Connection;