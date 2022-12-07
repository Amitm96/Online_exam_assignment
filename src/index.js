const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./routes/route")

app.use(express.json());

app.use("/" , route)
mongoose.connect("mongodb+srv://Amitmaz96:5YOiTjMdLmeCiWAC@cluster1.mdpsbcj.mongodb.net/OnlineexamDb?retryWrites=true&w=majority" , {useNewUrlParser : true})
.then(() => console.log("Mongodb is connected"))
.catch((err) => console.log(err.message))

app.listen(3000 , () => console.log("App runing on port 3000"))
