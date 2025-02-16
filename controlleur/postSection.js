const { PrismaClient } = require('@prisma/client');
const datas = new PrismaClient();
const upload = require('../middleware/multer'); // Assure-toi d'avoir bien configuré Multer
const util = require('util');


exports.allSectionPost = async (req, res) => {
  try {
    // Récupère tous les posts
    const data = await datas.postSection.findMany({include: {post: true}});
    // Envoie les données au client
    res.status(200).json(data);
  } catch (error) {
    // Gestion de l'erreur avec un message plus informatif
    res.status(500).json({
      message: error.message || 'Une erreur est survenue lors de la récupération des actualités.',
    });
  } finally {
    // Ferme la connexion Prisma (si nécessaire, en fonction du contexte)
    await datas.$disconnect();
  }
};



exports.createPostSection = async (req, res) => {
  try {
    // Exécuter Multer via promisify pour éviter les callbacks
    const uploadAsync = util.promisify(upload);
    await uploadAsync(req, res);

    // Vérifier les champs requis
    if (!req.body.title || !req.body.content || !req.body.postId) {
      return res.status(400).json({ message: "Titre et contenu requis." });
    }

    // Vérifier si le fichier est bien uploadé
    if (!req.file) {
      return res.status(400).json({ message: "Le logo est requis." });
    }

    // URL de l'image envoyée vers Cloudinary
    const urlLogo = req.file.path;

    // Création du post dans la base de données
    const post = await datas.postSection.create({
      data: {
        postId: parseInt(req.body.postId),
        title: req.body.title,
        content: req.body.content,
        image: urlLogo,
      },
    });

    return res.status(201).json({ message: "Post créé avec succès !", post });
  } catch (error) {
    console.error("Erreur :", error);
    return res.status(500).json({ message: "Erreur lors de la création du post", error: error.message });
  }
};

  

 exports.postSectionUpdate = (req, res, next)=> {
  const { id } = req.params
  const {postId, title, content, image } = req.body;
  
  datas.postSection.update({
      where: {
        idPostSection: parseInt(id),
      },
      data: {
        postId:postId,
          title:title,
          content:content,
          image:image
      },
  })
      .then(() => {
          res.status(200).send({
              message: 'Postsection was updated successfully',
          })
      })
      .catch((error) => {
          res.status(500).send({
              message: error.message || `Some error occurred while updating the post with id=${id}`,
          })
      })
};

exports.postSectionDelete =(req, res, next)=> {
  const { id } = req.params

  datas.postSection.delete({
      where: {
          idPostSection: parseInt(id),
      },
  })
      .then(() => {
          res.status(200).send({
              message: 'PostSection was deleted successfully',
          })
      })
      .catch((error) => {
          res.status(500).send({
              message: error.message || `Some error occurred while deleting the post with id=${id}`,
          })
      })
};
exports.getOnePosteSection = (req, res, next)=> {
  const { id } = req.params

  datas.postSection.findUnique({ where: { idPostSection: parseInt(id) } })
      .then((data) => {
          data
              ? res.status(200).send(data)
              : res.status(404).send({
                  message: `Cannot find post with id=${id}`,
              })
      })
      .catch((error) => {
          res.status(500).send({
              message: error.message || `Some error occurred while retrieving the post with id=${id}`,
          })
      })
};