const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// IMPORT MODELS
require('./models/Product');

const app = express();

//IMPORT ROUTES
require('./routes/productRoutes')(app);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/blog-app-web`);

// app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get('/data',function(req, res){
  res.send({data: 1})
});


app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}