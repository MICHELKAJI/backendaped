const { PrismaClient } = require('@prisma/client');
const datas = new PrismaClient();

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

// exports.createPostSection = (req, res, next)=> {

//   const { postId, title, content, image} = req.body;

//      datas.postSection.create({
//          data: {
//           postId:parseInt(postId),
//           title: title,
//           content:content,
//           image:image
//          },
//      })
//          .then((data) => {
//              res.status(201).send(data)
//          })
//          .catch((error) => {
//              res.status(500).send({
//                  message: error.message || 'Some error occurred while creating the post',
//              })
//          })
//  };

exports.createPostSection = (req, res, next) => {
    console.log('--- Début de la requête ---');
    
    // Vérifier si req.body est un objet FormData
    const formData = req.body;
    // const urlImage = req.file ? req.file.path : null;
    
    // Extraire les données du FormData
    const postId = parseInt(formData.postId);
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
      datas.postSection
        .create({
          data: {
            postId,
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
        message: 'Une erreur est survenue lors de la création de l\'poste section',
        error: error.message
      });
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