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
const initializePassport = require("./utils/passportConfig");
initializePassport(passport, username => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `users` WHERE `username` = '" + username + "'";
        connection.query(sql, (err, rows) => {
            console.log(rows);
            resolve(rows[0]);
        })
    })
}, id => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `users` WHERE `id` = " + id + "";
        connection.query(sql, (err, rows) => {
            resolve(rows[0]);
        })
    })
});
//ENDPOINTS
app.get('/', (req, res) => {
    if(req.user){
        console.log("User Logged IN : " + req.user);
        res.render("home",{
            showlog : false,
            showname : true,
            name :req.user.username
        })
    }
    else{
        console.log("User Not yet logged in");
        res.render("home",{
            showlog : true,
            showname : false,
            
        })
    }

    
    
})

app.get('/Login',(req,res)=>{
    res.render("login")
});

app.get('/AllQuiz',(req,res)=>{
    res.render("quiz_section")
});
app.get('/Quiz2',(req,res)=>{
    res.render("quiz_2")
});
app.get('/Quiz3',(req,res)=>{
    res.render("quiz_3")
});
app.post("/Login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
}))
app.get("/Register",(req,res)=>{
    res.render("register");
})
app.post("/Register",(req, res) => {
    try {
        
        let name = req.body.username;
        let email = req.body.Email;
        let password = req.body.Password;
        // let password = await bcrypt.hash(req.body.password, 10);
        console.log(name + email + password)
        const sql = "INSERT INTO `users` ( `username`, `email`, `password`) VALUES ('" + name + "', '" + email + "', '" + password + "');"
        connection.query(sql, (err, rows) => {
            if (!err) {
                res.render("login");
            } else {
                res.render("register",{
                    msg : "Error Registering , Try Again"
                });
            }
        })
    } catch (err) {
        // console.log("inside catch");
        return res.send({
            msg: "Email already registered",
        });
    }
})
//middlewares
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
// app.get('/LeaderBoard',(req,res)=>{
//     res.render("leaderboard")
// });
app.get("/leaderboard",(req, res) => {
    const sql2 = "SELECT * FROM `leaderboard` where `userid` like 1";
    
    const sql3 = "SELECT * FROM `leaderboard` where `userid` like 2";
    const sql4 = "SELECT * FROM `leaderboard` where `userid` like 3";
    const sql1 = " Select * from `users`";
    // let user1,user2,user3,user11,user12,user13,user21,user22,user23,user31,user32,user33;
    let users = [];
    let quiz1 = [];
    let quiz2 = [];
    let quiz3 = [];

    connection.query(sql1, (err, rows) => {
        console.log(rows.length);
            for(let i =1;i<rows.length;i++){
                users.push(rows[i].username);
                // console.log(users);
            }
            
             
        
    });
    
    connection.query(sql2, (err, rows) => {
        console.log(rows.length);
        for(let i =1;i<rows.length;i++){
            quiz1.push(rows[i].score);
        }
                
        // }
    })
    connection.query(sql3, (err, rows) => {
        console.log(rows.length);
        for(let i =1;i<rows.length;i++){
            quiz2.push(rows[i].score);
        }
                
        // }
    })
    connection.query(sql4, (err, rows) => {
        console.log(rows.length);
        for(let i =1;i<rows.length;i++){
            quiz3.push(rows[i].score);
        }
                
        // }
    })
    res.render("leaderboard", {
       users,
       quiz1,
       quiz2,
       quiz3
    })
            
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

app.get('/Compete', (req, res) => {
    res.render("compete")
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`Server is running at http://${hostname}:${port}/`)
})