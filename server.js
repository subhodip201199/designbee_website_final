require('dotenv').config()

const express = require('express')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const bodyParser = require('body-parser')

const pool = require('./config/database.js')

const app = express()

var url = require('url');
var cors = require('cors');
const { Console } = require("console");
const { SSL_OP_TLS_D5_BUG } = require("constants");

//-----------for file upload---------------

var formidable = require("formidable");
var fs = require("fs");



//app.use(express.static(__dirname + '/uploads'));

//--------------------------

const PORT = process.env.PORT || 5000

//const routes = require('./routes/index')

app.use(express.static(__dirname + '/views'));


app.use(cors());

app.set('view engine', 'ejs')
app.use(session({
    secret: 'thatsecretthinggoeshere',
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next){
    res.locals.message = req.flash('message');
    next();
});

//app.use('/', routes)
require('./config/passport')(passport)

app.listen(PORT, () => {
    console.log(`Application server started on port: ${PORT}`)
})


  
//------------------------ROUTINGS---------------------------//

app.get("/", (req, res) =>  {
  res.render("index");
});


var project_id;

app.get("/project", (req, res) =>  {
  var data = url.parse(req.url, true);
  data = data.query;
  project_id = data.project_id;

  console.log(project_id);

  res.render("project.ejs");
});

app.get("/blog", (req, res) =>  {
  res.render("blog.ejs");
});





//--------------------------APIs--------------------------------//

app.get("/project/getdata", async (req, res) => {

  pool.query(
   "select project_id, project_category, project_title from project order by sl_no desc LIMIT 15",
  
     
  //    WHERE id = 1`,
  //  
    (err, results) => {
      if (err) {
        throw err;
      }
      let data = results.rows;

      console.log(data);
      
      res.send(data);
    }
  );
});



app.get("/project/details/getdata", async (req, res) => {

  //var data = url.parse(req.url, true);
  //data = data.query;
  //project_id = data.project_id;

  pool.query(
   "select project_id, project_title, project_details from project where project_id = " + "'" +  project_id + "'",
  
     
  //    WHERE id = 1`,
  //  
    (err, results) => {
      if (err) {
        throw err;
      }
      let data = results.rows;

      console.log(data);
      
      res.send(data);
    }
  );
});


app.get("/home-text/getdata", async (req, res) => {

  pool.query(
   "select * from home_title order by id desc LIMIT 1",
  
     
  //    WHERE id = 1`,
  //  
    (err, results) => {
      if (err) {
        throw err;
      }
      let data = results.rows;

      console.log(data);
      
      res.send(data);
    }
  );
});

app.get("/homepage_video/getdata", async (req, res) => {

  pool.query(
   "select * from homepage_video order by id desc LIMIT 1",
  
     
  //    WHERE id = 1`,
  //  
    (err, results) => {
      if (err) {
        throw err;
      }
      let data = results.rows;

      console.log(data);
      
      res.send(data);
    }
  );
});


app.get("/blog/getdata", async (req, res) => {

  pool.query(
   "select * from blog order by id desc LIMIT 10",
  
     
  //    WHERE id = 1`,
  //  
    (err, results) => {
      if (err) {
        throw err;
      }
      let data = results.rows;

      console.log(data);
      
      res.send(data);
    }
  );
});


app.get("/aboutus/getdata", async (req, res) => {

  pool.query(
   "select * from aboutus order by id desc LIMIT 1",
  
     
  //    WHERE id = 1`,
  //  
    (err, results) => {
      if (err) {
        throw err;
      }
      let data = results.rows;

      console.log(data);
      
      res.send(data);
    }
  );
});

app.post("/add/contact", async (req, res) => {

  let { name, email, message } = req.body;

  console.log(name, email, message);

let errors = [];

if (!name || !email || !message) {
  errors.push({ message: "Please enter all fields" });
}

console.log(errors);
if (errors.length > 0) {
  res.redirect("/");
} else{
  // Validation passed
  
        pool.query(
          `INSERT INTO contact (name, email, message)
              VALUES ($1, $2, $3)`,
          [name, email, message],
          (err, results) => {
            if (err) {
              throw err;
            }
            res.redirect("/");
          }
        );
    }
    
});


app.get("/contact-details/getdata", async (req, res) => {

  pool.query(
   "select * from contact_details order by id desc LIMIT 1",
  
     
  //    WHERE id = 1`,
  //  
    (err, results) => {
      if (err) {
        throw err;
      }
      let data = results.rows;

      console.log(data);
      
      res.send(data);
    }
  );
});


/* Subhodip Please see this========================================*/

app.get("/work/getdata", async (req, res) => {

  pool.query(
   "select * from work order by id desc LIMIT 4",
  
     
  //    WHERE id = 1`,
  //  
    (err, results) => {
      if (err) {
        throw err;
      }
      let data = results.rows;

      console.log(data);
      
      res.send(data);
    }
  );
});


app.get("/review/getdata", async (req, res) => {

  pool.query(
   "select * from review order by id desc LIMIT 4",
  
     
  //    WHERE id = 1`,
  //  
    (err, results) => {
      if (err) {
        throw err;
      }
      let data = results.rows;

      console.log(data);
      
      res.send(data);
    }
  );
});