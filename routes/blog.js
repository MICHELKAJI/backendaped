const express = require("express");
const routes = express.Router();
const blogs= require("../controlleur/post");

routes.get('/', blogs.allblos)

module.exports = routes;


