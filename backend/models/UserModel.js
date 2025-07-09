const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const User = db.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true
});

module.exports = User;

// Baris ini akan membuat tabel jika belum ada

// (async () => {
//   await db.sync({ alter: true }); // <-- TAMBAHKAN { alter: true }
// })();