'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TicketSchema = new Schema({
  title: String,
  description: String,
  author: String,
  environment: String,
  status: { type: Number, default: 0 },
  files: [{ fileName: String }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', TicketSchema);