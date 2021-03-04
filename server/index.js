const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    // Change password and database to your specific password and database your using 
    password: "",
    database: "",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get',(req,res)=>{

 const sqlSelect =
   "SELECT * FROM movie_reviews";
 db.query(sqlSelect, (err, result) => {
   res.send(result);
 });
});

app.post("/api/insert", (req, res) => {

   const movie_name = req.body.movieName; 
   const movie_review = req.body.movieReview;

  const sqlInsert =
    "INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?,?);";
  db.query(sqlInsert, [movie_name, movie_review], (err, result) => {
    console.log(err)
  });
});
    

app.listen(3001,() =>{
    console.log("running on port 3001");
});


// app.get('/', (req,res) => {
//     //     // const sqlInsert = "INSERT INTO movie_reviews (movie_name, movie_review) VALUES ('inception', 'good movie');"
//     //     // db.query(sqlInsert, (err,result)=>{ 
//     //     //     res.send("hello AJIRO");
//     //     //     if (err) throw err;
//     //     });