const express = require('express');
const app = express();
const routeBlogs = require("./routes/blog");
const routenews = require("./routes/newsLetter");
const routevent = require("./routes/postSection");
const routedonation = require("./routes/donation");
const routeactuality = require("./routes/actuality");


app.use(express.json());
app.use('/images',express.static('images'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
    
  });
   
  app.use('/post', routeBlogs);
  app.use('/news', routenews );
  app.use('/postsection', routevent );
  app.use('/donation', routedonation );
  app.use('/actuality', routeactuality );

  module.exports = app;