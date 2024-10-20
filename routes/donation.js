const express = require("express");
const routes = express.Router();
const donations = require("../controlleur/donation");

routes.get('/', donations.alldonation);
routes.post('/', donations.donationCreate);
routes.put('/:id', donations.donationUpdate);
routes.delete('/:id', donations.donatDelete);

module.exports = routes;
