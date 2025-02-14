const { PrismaClient } = require('@prisma/client');
const datas = new PrismaClient();

exports.allActuality = async (req, res) => {
  try {
    // Récupère tous les posts
    const data = await datas.actuality.findMany();
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

exports.actualityCreate = (req, res, next) => {
    console.log('--- Début de la requête ---');
    
    // Vérifier si req.body est un objet FormData
    const formData = req.body;
    // const urlImage = req.file ? req.file.path : null;
    
    // Extraire les données du FormData
    const title = formData.title;
    const content = formData.content;
    const image = formData.image;
  
    // Validation des entrées
    if (!title || !content) {
      console.log('Erreur: Titre ou contenu manquant');
      return res.status(400).json({
        message: 'Le titre et le contenu sont obligatoires',
      });
    }
  
    // Vérification de l'image
    if (!image) {
      console.log('Erreur: Image manquante');
      return res.status(400).json({
        message: 'Une image est requise pour créer une actualité',
      });
    }

    // Création de l'actualité dans la base avec async/await
    try {
      console.log('Tentative de création dans la base de données...');
      datas.actuality
        .create({
          data: {
            title,
            content,
            image
          },
        })
        .then((data) => {
          console.log('Création réussie:', data);
          res.status(201).json({
            message: 'Actualité créée avec succès',
            actuality: data,
          });
        });
    } catch (error) {
      console.error('Erreur détaillée lors de la création:', error);
      console.error('Stack trace:', error.stack);
      res.status(500).json({
        message: 'Une erreur est survenue lors de la création de l\'actualité',
        error: error.message
      });
    }
};
  

exports.actualityUpdate = (req, res, next)=> {
  const { id } = req.params
  const {title, content, image } = req.body;
  
  datas.actuality.update({
      where: {
        idActuality: parseInt(id),
      },
      data: {
             title:title,
             content: content,
             image: image
      },
  })
      .then(() => {
          res.status(200).send({
              message: 'Donate was updated successfully',
          })
      })
      .catch((error) => {
          res.status(500).send({
              message: error.message || `Some error occurred while updating the post with id=${id}`,
          })
      })
};

exports.actualityDelete =(req, res, next)=> {
  const { id } = req.params

  datas.actuality.delete({
      where: {
        idActuality: parseInt(id),
      },
  })
      .then(() => {
          res.status(200).send({
              message: 'Donate was deleted successfully',
          })
      })
      .catch((error) => {
          res.status(500).send({
              message: error.message || `Some error occurred while deleting the post with id=${id}`,
          })
      })
};

exports.getOneActuality = (req, res, next)=> {
    const { id } = req.params

    datas.actuality.findUnique({ where: { idActuality: parseInt(id) } })
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