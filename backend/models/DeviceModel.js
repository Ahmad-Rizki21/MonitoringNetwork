const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const Device = db.define('devices', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // TAMBAHKAN FIELD INI
  cluster: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Default' // Beri nilai default jika perlu
  },
  // --- KOLOM BARU UNTUK DETAIL ---
  product_model: { type: DataTypes.STRING },
  firmware_version: { type: DataTypes.STRING },
  cpu_usage: { type: DataTypes.INTEGER, defaultValue: 0 },
  memory_usage: { type: DataTypes.INTEGER, defaultValue: 0 },
  uptime: { type: DataTypes.STRING },
  snmp_community: { type: DataTypes.STRING, defaultValue: 'public' },
  
  status: {
    type: DataTypes.STRING,
    defaultValue: 'unknown' // online, offline, unknown
  },
  latency: {
    type: DataTypes.STRING,
    defaultValue: 'N/A'
  }
  
}, {
  freezeTableName: true
});



module.exports = Device;

// (async () => {
//   await db.sync({ alter: true }); // <-- TAMBAHKAN { alter: true }
// })();