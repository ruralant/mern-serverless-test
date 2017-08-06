const mongoose = require('mongoose');
const TaskSchema = require('../models/Task');

module.exports = {
  // Connect/Disconnect middleware
  connectDisconnect: (req, res, next) => {
    // create connection using Mongo Lab URL available in Webtask context
    const connection = mongoose.createConnection(req.webtaskContext.secrets.MONGO_URL);
    // Create a mongoose model using the Schema
    req.taskModel = connection.model('Task', TaskSchema);
    req.on('end', () => {
      // disconnect when request processing is completed
      mongoose.connection.close();
    });
    // call next to move the next Express middleware
    next();
  },
};