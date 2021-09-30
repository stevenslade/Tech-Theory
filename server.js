const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

//just added
//require('dotenv').config();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

//The addition of rolling:true and maxAge was meant to cause the cookie to expire after idle and it is working, 30000 equals 30 seconds, 300000 equals five minutes.  But nothing happens after the time interval, its just that if you try to do something it takes you back to a login screen
const sess = {
  secret: process.env.DB_SESSPASS,
  cookie: {
  maxAge: 300000
  },
  resave: false,
  saveUninitialized: true,
  rolling: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// app.engine(".hbs", exphbs({ extname: ".hbs" }));
// app.set("view engine", ".hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//trying to set a path for a background image, I think this contradicts line 42
//app.use(express.static('./views/images'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
