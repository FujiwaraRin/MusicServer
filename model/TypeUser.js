const mongoose = require('mongoose');

const typeUserSchema = new mongoose.Schema({
  type_user_id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
});

const TypeUser = mongoose.model('TypeUser', typeUserSchema);

module.exports = TypeUser;