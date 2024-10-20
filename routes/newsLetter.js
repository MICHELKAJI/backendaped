const express = require("express");
const routes = express.Router();
const news = require("../controlleur/newsLetter");


routes.get('/', news.allNews);
routes.post('/', news.newsCreate);
routes.delete('/:id', news.newsdelete);



module.exports = routes;
