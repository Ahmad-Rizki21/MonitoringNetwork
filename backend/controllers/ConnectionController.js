const Connection = require("../models/ConnectionModel.js");
const Device = require("../models/DeviceModel.js");

// Mengambil semua koneksi berdasarkan cluster
exports.getConnectionsByCluster = async (req, res) => {
  try {
    const connections = await Connection.findAll({
      include: [{
        model: Device,
        as: 'sourceDevice',
        where: { cluster: req.query.cluster },
        attributes: []
      }]
    });
    res.json(connections);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Gagal mengambil data koneksi" });
  }
};

// Membuat koneksi baru
exports.createConnection = async (req, res) => {
  const { sourceId, targetId } = req.body;
  try {
    await Connection.create({ sourceId, targetId });
    res.status(201).json({ msg: "Koneksi berhasil dibuat" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Gagal membuat koneksi" });
  }
};