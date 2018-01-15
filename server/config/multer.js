const multer = require("multer");
const path = require("path");



const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/uploads/');
  },
  filename: (req, file, callback) => {
    // callback(null, file.originalname + '-' + Date.now());
    console.log(file);
    callback(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});


const upload = multer({ storage: this.storage });
module.exports = upload;
