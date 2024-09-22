import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import mongoose from './config/database.js';
import MongoStore from 'connect-mongo';
import sessionsRouter from './routes/api/sessions.js';
import viewsRouter from './routes/views.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cookieParser from 'cookie-parser';

const app = express();

const PORT = 8080

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ 
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://admin:Coder2024@cluster0.8vmpp.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0' })
}));

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use(passport.session()) 

app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
