import express from 'express';
import connectDB from './db/db.js';
import 'dotenv/config'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

connectDB()


app.get("/", (req, res) => {
    res.send("Hiii");
});


app.listen(3000, (req, res) => {
    console.log("server started at port 3000");
});