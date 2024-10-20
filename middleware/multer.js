const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images');
  },
  filename: (req, files, callback) => {
    callback(null, `${Date.now()}_${files.originalname}`);
  }
});

module.exports = multer({storage: storage}).single('Logo');