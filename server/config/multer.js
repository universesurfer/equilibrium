const multer = require("multer");
const path = require("path");



const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname + '-' + Date.now());
    // callback(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});



const upload = multer({ storage: storage });
module.exports = upload;
