const { PrismaClient } = require('@prisma/client');
const datas = new PrismaClient();

exports.alldonation = async (req, res) => {
  try {
    // Récupère tous les posts
    const data = await datas.donation.findMany();
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

exports.donationCreate = (req, res, next)=> {

  const { nom, tel, mail, ville } = req.body;
 
     datas.donation.create({
         data: {
          nom: nom,
          tel:tel,
          mail:mail, 
          ville: ville
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
 exports.donationUpdate = (req, res, next)=> {
  const { id } = req.params
  const {nom, tel, mail, ville } = req.body;
  
  datas.donation.update({
      where: {
        idDonateur: parseInt(id),
      },
      data: {
        nom: nom,
        tel:tel,
        mail:mail, 
        ville: ville
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

exports.donatDelete =(req, res, next)=> {
  const { id } = req.params

  datas.donation.delete({
      where: {
          idDonateur: parseInt(id),
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
}