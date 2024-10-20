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

exports.createPostSection = (req, res, next)=> {

  const { postId, title, content } = req.body;

  const urlImage = req.file.path;
 
     datas.postSection.create({
         data: {
          postId:postId,
          title: title,
          content:content,
          image:urlImage
         },
     })
         .then((data) => {
             res.status(201).send(data)
         })
         .catch((error) => {
             res.status(500).send({
                 message: error.message || 'Some error occurred while creating the post',
             })
         })
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