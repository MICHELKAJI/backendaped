const { PrismaClient } = require('@prisma/client');
const datas = new PrismaClient();

exports.allNews = async (req, res) => {
  try {
    // Récupère tous les posts
    const data = await datas.newsLetter.findMany();
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

exports.newsCreate = (req, res, next)=> {

    const { mail } = req.body;
   
       datas.newsLetter.create({
           data: {
            mail: mail
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

   exports.newsdelete =(req, res, next)=> {
    const { id } = req.params

    datas.newsLetter.delete({
        where: {
            idNewsLetter: parseInt(id),
        },
    })
        .then(() => {
            res.status(200).send({
                message: 'Mail was deleted successfully',
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || `Some error occurred while deleting the post with id=${id}`,
            })
        })
}