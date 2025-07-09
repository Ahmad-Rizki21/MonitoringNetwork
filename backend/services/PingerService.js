const ping = require('ping');
const Device = require('../models/DeviceModel');

const startPinging = (io) => {
  setInterval(async () => {
    try {
      const devices = await Device.findAll();
      for (const device of devices) {
        let res = await ping.promise.probe(device.ip_address, {
          timeout: 2,
        });

        const newStatus = res.alive ? 'online' : 'offline';
        const newLatency = res.alive ? `${parseFloat(res.time).toFixed(2)} ms` : 'N/A';

        // Update database hanya jika ada perubahan status atau latency
        if (device.status !== newStatus || device.latency !== newLatency) {
          device.status = newStatus;
          device.latency = newLatency;
          await device.save();

          // Siarkan update ke semua client yang terhubung
          io.emit('device-update', {
            id: device.id,
            status: newStatus,
            latency: newLatency,
          });
        }
      }
    } catch (error) {
      console.error("Error during pinging service:", error);
    }
  }, 5000); // Lakukan ping setiap 5 detik
};

module.exports = { startPinging };