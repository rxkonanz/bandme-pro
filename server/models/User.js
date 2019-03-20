const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  name: String,
  password: String,
  artistType: String,
  ytLink: String,
  imgLink: String,
  instrument: String,
  likedMusicians: Array
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
