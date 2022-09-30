//const { string } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
mail: { type: String, unique: true },
username: { type: String },
password: { type: String },
})

//we export so we can import (use) file functions under a different file. essentially to seperate stuff so things arent messy 
module.exports = mongoose.model('user', userSchema);