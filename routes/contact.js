const express = require('express');
const Contact = require('../models/contact');
const cloudinary = require('../utils/cloudinary')
const router = express.Router();
const fs = require('fs');
const upload= require('../middlewares/multer');
const { getAllContacts, AddContact, DeleteContact, EditContact } = require('../controllers/contact');



router.get('/',getAllContacts)

router.post('/add', upload.single('image'), AddContact);

router.put('/:id', upload.single('image'), EditContact)

router.delete('/:id',DeleteContact)



router.get('/:id', async(req,res)=>{
  let contact = await Contact.findById(req.params.id);
  res.json(contact)
})
module.exports = router;