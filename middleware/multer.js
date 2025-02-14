const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images');
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage }).single('image');

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(400).json({ message: 'Erreur liée à l\'upload', error: err.message });
    } else if (err) {
      console.error('Autre erreur:', err);
      return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
    next();
  });
};
