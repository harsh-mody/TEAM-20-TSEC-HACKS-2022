const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const fs = require('fs');
const hostname = '127.0.0.1';
const port = process.env.PORT || 3001;
const bcrypt = require("bcrypt");

const connection = require("./utils/dbconnection");
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectory));
app.use(express.json());

app.use(flash());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

//allow to access data from req
app.use(express.urlencoded({ extended: false }));

//ENDPOINTS
app.get('/', (req, res) => {
    res.render("home")
})
app.get('/quiz', (req, res) => {
    res.render("quiz_home")
})

app.get('/stack', (req, res) => {
    res.render("stack")
})

app.get('/queue', (req, res) => {
    res.render("queue")
})

app.get('/game', (req, res) => {
    res.render("game")
})

app.get('/deque', (req, res) => {
    res.render("deque")
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`Server is running at http://${hostname}:${port}/`)
})