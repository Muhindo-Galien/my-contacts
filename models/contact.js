// Define schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: String,
  image: String,
  cloudinary_id: String,
},);

module.exports = mongoose.model("Contact",contactSchema)