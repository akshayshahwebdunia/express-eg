const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const members = require("./Members");

const logger = require("./middleware/logger");

var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//app.use(logger);
app.get('/', (req, res) => res.render('index',{
    title:"The GOD",
    members
}));


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/api/members',require("./routes/api/members"));
app.use(express.static(path.join(__dirname, "public")));

/* app.get("/",(req,res)=>{
   res.sendFile(path.join(__dirname,"public","index.html"));
}); */

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
