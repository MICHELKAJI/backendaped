const express = require("express");
const routes = express.Router();
const donations = require("../controlleur/donation");

routes.get('/', donations.alldonation)

module.exports = routes;
