const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuration du stockage avec Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Images',
    format: async (req, file) => 'png',
    public_id: (req, file) => `${Date.now()}_${file.originalname.split('.')[0]}`,
    resource_type: 'image', // 🔥 Ajouté pour supporter de plus gros fichiers
    transformation: [{ quality: "auto", fetch_format: "auto" }], // 🔥 Compression automatique
  },
});

// Middleware Multer avec une taille max de 20 Mo
const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 🔥 Augmenté à 20 Mo
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Seuls les fichiers image sont autorisés !'), false);
    }
    cb(null, true);
  }
}).single('image');

module.exports = upload;
