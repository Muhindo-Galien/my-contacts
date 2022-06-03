const multer = require('multer');
//define storage for the images
const storage = multer.diskStorage({
  //destination for files
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  //add back the extension
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});
module.exports =upload