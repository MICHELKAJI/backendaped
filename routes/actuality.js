const express = require("express");
const routes = express.Router();
const actuality = require("../controlleur/actuality");

routes.get('/', actuality.allActuality);
routes.post('/', actuality.actualityCreate);
routes.put('/:id', actuality.actualityUpdate);
routes.delete('/:id', actuality.actualityDelete);
routes.get('/:id', actuality.getOneActuality);

module.exports = routes;