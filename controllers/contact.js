const Contact = require("../models/contact");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/multer");
const fs = require("fs");

const getAllContacts = async (req, res) => {
  const result = await Contact.find({}).exec();
  res.json(result);
};

const AddContact = async (req, res) => {
    console.log(req.file);

  try {
    const {name,phone} = req.body
    // upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const { path } = req.file;
    // create new user
    let contact = new Contact({
      name: name,
      phone: phone,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    })
    await contact.save();
    // removed the uploaded image from the uploads folder
    fs.unlinkSync(path);
    res.json(contact);
  } catch (error) {
    console.log(error);
  }
};

const EditContact = async (req, res) => {
  console.log(req.file);
  try {
    let contact = await Contact.findById(req.params.id).exec();
    
    await cloudinary.uploader.destroy(contact.cloudinary_id);
    let result;
    // if we want to update the image then we check
    if (req.file) {
        const { path } = req.file;
      result = await cloudinary.uploader.upload(path);
    }
    const data = {
      name: req.body.name || contact.name,
      image: result?.secure_url || contact.image,
      cloudinary_id: result?.public_id || contact.cloudinary_id,
    };
    contact = await Contact.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(contact);
    if(req.file){
        fs.unlinkSync(path);
    }
  } catch (error) {
    console.log(error);
  }
};

const DeleteContact = async (req, res) => {
  try {
    // get the contact by Id
    const contact = await Contact.findById(req.params.id);
    // delete the the picture from cloudinary using the cloudinary_id
    await cloudinary.uploader.destroy(contact.cloudinary_id);
    // remove the contact from the database
    await contact.remove();
    res.json(contact);
    console.log(
      `Your contact with the name ${contact.name} has been deleted successfully!`
    );
  } catch (error) {
    console.log(error);
  }
};

const getSingleContact = async (req, res) => {
  const result = await Contact.find({}).exec();
  res.json(result);
};

module.exports = {
  getAllContacts,
  AddContact,
  EditContact,
  DeleteContact,
  getSingleContact,
};
