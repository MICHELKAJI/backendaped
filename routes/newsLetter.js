const express = require("express");
const routes = express.Router();
const news = require("../controlleur/newsLetter");

routes.get('/', news.allNews)

module.exports = routes;
