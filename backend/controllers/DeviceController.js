const Device = require("../models/DeviceModel.js");

exports.getDevices = async (req, res) => {
  try {
    const whereClause = {};
    if (req.query.cluster) {
      whereClause.cluster = req.query.cluster;
    }
    const devices = await Device.findAll({ where: whereClause });
    res.json(devices);
  } catch (error) {
    res.status(500).json({ msg: "Gagal mengambil data perangkat" });
  }
};


exports.deleteDevice = async (req, res) => {
  try {
    const device = await Device.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!device) return res.status(404).json({ msg: "Perangkat tidak ditemukan" });

    await Device.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ msg: "Perangkat berhasil dihapus" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Gagal menghapus perangkat" });
  }
};

exports.updateDevice = async (req, res) => {
  const { name, ip_address, cluster } = req.body;
  try {
    const device = await Device.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!device) return res.status(404).json({ msg: "Perangkat tidak ditemukan" });

    await device.update({ name, ip_address, cluster });
    res.status(200).json({ msg: "Perangkat berhasil diperbarui" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Gagal memperbarui perangkat" });
  }
};

exports.getDeviceById = async (req, res) => {
  try {
    const device = await Device.findOne({
      where: { id: req.params.id }
    });
    if (!device) return res.status(404).json({ msg: "Perangkat tidak ditemukan" });
    res.json(device);
  } catch (error) {
    res.status(500).json({ msg: "Gagal mengambil data perangkat" });
  }
};


const snmp = require("net-snmp");

exports.refreshDeviceDetails = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);
    if (!device) return res.status(404).json({ msg: "Perangkat tidak ditemukan" });

    const session = snmp.createSession(device.ip_address, device.snmp_community || 'public');
    
    // --- PENTING: OID (Object Identifier) ---
    // OID di bawah ini adalah contoh umum. Anda HARUS mencari OID yang tepat untuk perangkat HSGQ Anda.
        const oids = [
    "1.3.6.1.4.1.xxxxx.1.2.3", // <-- OID CPU yang benar
    "1.3.6.1.4.1.xxxxx.1.2.4", // <-- OID Memory yang benar
    "1.3.6.1.2.1.1.1.0",       // System Description
    "1.3.6.1.2.1.1.3.0",       // Uptime
    ];

    session.get(oids, async (error, varbinds) => {
      if (error) {
        console.error("SNMP Error:", error);
        return res.status(500).json({ msg: "Gagal mengambil data SNMP dari perangkat." });
      }

      const details = {};
      varbinds.forEach((vb) => {
        if (snmp.isVarbindError(vb)) {
          console.error(snmp.varbindError(vb));
        } else {
          if (vb.oid.startsWith(oids[0])) details.cpu_usage = vb.value;
          if (vb.oid.startsWith(oids[1])) details.memory_usage = vb.value;
          if (vb.oid.startsWith(oids[2])) {
            const description = vb.value.toString();
            // Coba parsing deskripsi untuk model dan firmware
            // Ini sangat bergantung pada format output perangkat Anda
            details.firmware_version = description; 
          }
          if (vb.oid.startsWith(oids[3])) details.uptime = snmp.parseTimeTicks(vb.value);
        }
      });
      
      await device.update(details);
      session.close();
      res.json(device);
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error internal server saat refresh SNMP" });
  }
};



// Modifikasi fungsi createDevice untuk menerima cluster
exports.createDevice = async (req, res) => {
  const { name, ip_address, cluster } = req.body;
  if (!cluster) return res.status(400).json({ msg: "Nama cluster harus diisi" });
  try {
    await Device.create({ name, ip_address, cluster });
    res.status(201).json({ msg: "Perangkat berhasil ditambahkan" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Gagal menambahkan perangkat", error: error.message });
  }
};