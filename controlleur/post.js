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
