const mongoose = require('mongoose');

const Task = require('../models/Task');

module.exports = (app) => {
  app.get('/tasks', (req, res) => {
    req.taskModel.find({}).sort({'created_at': -1}).exec((err, tasks) => res.json(tasks));
  });

  app.post('/tasks', (req, res) => {
    const newTask = new req.taskModel(Object.assign({}, req.body, {created_at: Date.now()}));
    newTask.save((err, savedTask) => {
      res.json(savedTask);
    });
  });

  app.put('/tasks', (req, res) => {
    const idParam = req.webtaskContext.query.id;
    req.taskModel.findOne({_id: idParam}, (err, taskToUpdate) => {
      const updatedTask = Object.assign(taskToUpdate, req.body);
      updatedTask.save((err, task) => res.json(task));
    });
  });

  app.delete('/tasks', (req, res) => {
    const idParam = req.webtaskContext.query.id;
    req.taskModel.remove({_id: idParam}, (err, removedTask) => res.json(removedTask));
  });
};