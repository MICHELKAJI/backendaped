const { PrismaClient } = require('@prisma/client');
const datas = new PrismaClient();

exports.allblos = async (req, res) => {
  try {
    // Récupère tous les posts
    const data = await datas.post.findMany();
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

exports.createPost = (req, res, next)=> {

  const { title, content, type } = req.body;
 
     datas.post.create({
         data: {
          title: title,
          content: content,
          type: type,

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
 
 exports.postUpdate = (req, res, next)=> {
  const { id } = req.params
  const {title, content, type } = req.body;
  
  datas.post.update({
      where: {
        idPost: parseInt(id),
      },
      data: {
        title: title,
        content: content,
        type: type
      },
  })
      .then(() => {
          res.status(200).send({
              message: 'Post was updated successfully',
          })
      })
      .catch((error) => {
          res.status(500).send({
              message: error.message || `Some error occurred while updating the post with id=${id}`,
          })
      })
};

exports.postDelete =(req, res, next)=> {
  const { id } = req.params

  datas.post.delete({
      where: {
          idPost: parseInt(id),
      },
  })
      .then(() => {
          res.status(200).send({
              message: 'Post was deleted successfully',
          })
      })
      .catch((error) => {
          res.status(500).send({
              message: error.message || `Some error occurred while deleting the post with id=${id}`,
          })
      })
};

exports.getOnePost = (req, res, next)=> {
    const { id } = req.params
  
    datas.post.findUnique({ where: { idPost: parseInt(id) } })
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