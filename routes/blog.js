const express = require("express");
const routes = express.Router();
const blogs= require("../controlleur/post");

routes.get('/', blogs.allblos);
routes.post('/', blogs.createPost);
routes.put('/:id', blogs.postUpdate);
routes.delete('/:id', blogs.postDelete);
routes.get('/:id', blogs.getOnePost);

module.exports = routes;


