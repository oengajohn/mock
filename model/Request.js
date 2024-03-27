const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  resourceUrl: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("Request", RequestSchema);
