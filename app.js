require('pg');
const express = require('express');
const path = require('path');
const { engine } = require("express-handlebars");
const hbs = require("handlebars");
const db = require('./configs/db');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const passport = require('passport');

const app = express();

// Để sử dụng biến môi trường trong file .env
require('dotenv').config();

// Passport config
require('./configs/passport')(passport);

// Sử dụng json parser
app.use(express.json());
// Sử dụng x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(session({
    store: new PgSession({
        conString: process.env.POSTGRES_URL_NO_SSL,
    }),
    secret: 'penguynSecret',
    resave: false,
    saveUninitialized: true,
}))

// Passport middlewares
app.use(passport.session());
app.use(passport.initialize());


// Thiết lập view engine là Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));

// Đăng ký các handlebars helpers
const hbs_helpers = require("./helpers/handlebars.helpers");

hbs.registerHelper('range', hbs_helpers.range);
hbs.registerHelper('add', hbs_helpers.add);
hbs.registerHelper('eq', hbs_helpers.eq);
hbs.registerHelper('getImage', hbs_helpers.getImage);
hbs.registerHelper('gt', hbs_helpers.gt);
hbs.registerHelper('lt', hbs_helpers.lt);
hbs.registerHelper('subtract', hbs_helpers.subtract);

// Thiết lập thư mục tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Định nghĩa các routes
app.get('/', (req, res) => {
    res.render('home', {
        currentView: 'home',
        name: req.user?.username,
        profileImg: req.user?.picture,
    });
})
app.use('/users', require('./apps/users/user.routes'));

// Kết nối database
const connectDB = async () => {
    console.log('Check database connection...');

    try {
        await db.authenticate();
        // Đồng bộ các models
        await db.sync({ force: false });
        console.log('Database connection established');
    } catch (e) {
        console.log('Database connection failed', e);
    }
};

const PORT = process.env.PORT || 3000;

(async () => {
    await connectDB();
    // Khởi động server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})();