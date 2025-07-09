const express = require("express");
const { getConnectionsByCluster, createConnection } = require("../controllers/ConnectionController.js");

const router = express.Router();

router.get('/connections', getConnectionsByCluster);
router.post('/connections', createConnection);

module.exports = router;