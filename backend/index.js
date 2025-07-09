const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require("socket.io");

const sequelize = require('./config/database.js');
const UserRoutes = require('./routes/UserRoute.js');
const DeviceRoutes = require('./routes/DeviceRoute.js');
const { startPinging } = require('./services/PingerService.js');
const ConnectionRoutes = require('./routes/ConnectionRoute.js');

// Panggil semua model agar ter-register oleh Sequelize
require('./models/UserModel.js');
require('./models/DeviceModel.js');
require('./models/ConnectionModel.js');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(UserRoutes);
app.use(DeviceRoutes);
app.use(ConnectionRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => { // <-- jadikan async
  // Sinkronisasi database hanya dijalankan satu kali di sini
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized successfully.');
    
    // Jalankan Pinger Service setelah database siap
    startPinging(io);

    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('❌ Unable to synchronize database:', error);
  }
});