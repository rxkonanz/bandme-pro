const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  musicianLiked: String,
  likedBy: String
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;