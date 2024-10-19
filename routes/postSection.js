const express = require("express");
const routes = express.Router();
const evenement= require("../controlleur/postSection");

routes.get('/', evenement.allSectionPost)

module.exports = routes;


