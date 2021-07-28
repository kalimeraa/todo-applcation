const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
  todo: {
    type: String,
  }
});

module.exports = ToDo = mongoose.model('todo', ToDoSchema);
