const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const InventorySchema = new Schema({
  item: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },

  category: {
    type: String,
    enum: ["Electronics", "Computers", "Furniture", "Stationary", "Other"],
    trim: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Inventory = mongoose.model("Inventory", InventorySchema);
