const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactsList = new Schema({ list: [{ userName: String }] });

module.exports = mongoose.model("ContactsList", ContactsList);
