import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  name: String,
  description: String,
  pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pin' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Board = mongoose.model('Board', boardSchema);

export default Board;
