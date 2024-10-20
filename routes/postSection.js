const express = require("express");
const routes = express.Router();
const evenement= require("../controlleur/postSection");

routes.get('/', evenement.allSectionPost);
routes.post('/', evenement.createPostSection);
routes.put('/:id', evenement.postSectionUpdate);
routes.delete('/:id', evenement.postSectionDelete);
routes.get('/id:', evenement.getOnePosteSection)

module.exports = routes;


