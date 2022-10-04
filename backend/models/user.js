//const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
mail: { type: String, unique: true },
username: { type: String },
password: { type: String },
friends: [{type: Schema.Types.Object, ref: 'User'}],
})

//we export so we can import (use) file functions under a different file. essentially to seperate stuff so things arent messy 
module.exports = mongoose.model('User', userSchema);