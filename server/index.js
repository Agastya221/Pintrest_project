import express from 'express';
import connectDB from './db/db.js';
import Router from './routes/route.routes.js';
import 'dotenv/config'
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


connectDB()


app.use("/user", Router)
app.use((req, res, next) => {
    console.log('Request:', req.method, req.url);
    next();
  });
app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(3000, (req, res) => {
    console.log("server started at port 3000");
});