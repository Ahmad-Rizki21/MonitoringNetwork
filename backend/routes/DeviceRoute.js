const express = require("express");
const { getDevices, getDeviceById, createDevice, deleteDevice, updateDevice, refreshDeviceDetails } = require("../controllers/DeviceController.js");


const router = express.Router();

router.get('/devices', getDevices);
router.post('/devices', createDevice);
router.delete('/devices/:id', deleteDevice);
router.get('/devices/:id', getDeviceById);
router.put('/devices/:id', updateDevice);
router.post('/devices/:id/refresh', refreshDeviceDetails);

module.exports = router;