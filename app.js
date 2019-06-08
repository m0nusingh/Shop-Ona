
const express =  require('express');
const path =  require('path');
const app = express();

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const outRoutes = require('./routes/out');
const shopRoutes = require('./routes/shop');
  
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');
app.set('views','views');

app.use(outRoutes);
app.use(shopRoutes);
const MONGODB_URI =
  'mongodb+srv://hell:tcvQfcclS2WJv3zM@livecandle-4mrbf.mongodb.net/shop';
// mongodb+srv://hell:<password>@livecandle-4mrbf.mongodb.net/test
// tcvQfcclS2WJv3zM


const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });

  app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );


mongoose
  .connect(MONGODB_URI)
  .then(result => {
      console.log('listening on 3000')
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
